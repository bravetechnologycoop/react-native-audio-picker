#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTRootView.h>
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <AVKit/AVRoutePickerView.h>

@interface BRVAudioPicker : NSObject <RCTBridgeModule>

@end

@implementation BRVAudioPicker

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getAudioOutput:(RCTResponseSenderBlock)callback)
{
    AVAudioSessionPortDescription* outputObj = [[[[AVAudioSession sharedInstance] currentRoute] outputs] firstObject];
    
    if(outputObj == nil) {
        callback(@[[NSNull null], @{@"type": @"Unknown", @"name": @"Not Available"}]);
        
    } else {
    callback(@[[NSNull null], @{@"type": outputObj.portName, @"name": outputObj.selectedDataSource.dataSourceName == nil ? @"Unknown" : outputObj.selectedDataSource.dataSourceName}]);
    }
}


RCT_EXPORT_METHOD(getAvailableInputs:(RCTResponseSenderBlock)callback)
{
    NSMutableArray* inputPortArray = [[NSMutableArray alloc] init];
    for(AVAudioSessionPortDescription* input in [[AVAudioSession sharedInstance] availableInputs])
    {
        if(![inputPortArray containsObject:[input portType]]) {
            [inputPortArray addObject:[input portType]];
        }
    }
    
    callback(@[[NSNull null], inputPortArray]);
}


RCT_EXPORT_METHOD(presentAudioPicker:(RCTResponseSenderBlock) callback)
{
    CGRect frame = CGRectZero;
    
    AVRoutePickerView* audioPickerView = [[AVRoutePickerView alloc] initWithFrame:frame];
    [audioPickerView setHidden:TRUE];
    [[[[UIApplication sharedApplication]delegate] window] addSubview:audioPickerView];
    for (UIView *subView in [audioPickerView subviews]) {
        if ([subView isKindOfClass:[UIButton class]]) {
            UIButton* button = (UIButton*) subView;
            [button sendActionsForControlEvents:UIControlEventTouchUpInside];
        }
    }
    callback(nil);
}

- (NSDictionary *)constantsToExport
{
    return @{
        @"audioPortTypes": @{
                @"AVAudioSessionPortAirPlay": @"AirPlay",
                @"AVAudioSessionPortBluetoothA2DP":@"Bluetooth",
                @"AVAudioSessionPortBluetoothLE": @"Bluetooth",
                @"AVAudioSessionPortBuiltInReceiver": @"Earpiece",
                @"AVAudioSessionPortBuiltInSpeaker": @"Speaker",
                @"AVAudioSessionPortHeadphones": @"Headphones",
                @"AVAudioSessionPortLineOut": @"Line Out"
        }
    };
}

@end
