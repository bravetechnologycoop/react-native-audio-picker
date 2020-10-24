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

RCT_EXPORT_METHOD(getAudioOutputType:(RCTResponseSenderBlock) callback)
{
    id result = [[[[[AVAudioSession sharedInstance] currentRoute] outputs] firstObject] portType];
    
    callback(@[[NSNull null], result]);
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
    callback(@[[NSNull null], [NSNull null]]);
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
