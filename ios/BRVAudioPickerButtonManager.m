#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
#import <AVKit/AVRoutePickerView.h>

@interface BRVAudioPickerButtonManager : RCTViewManager
@end

@implementation BRVAudioPickerButtonManager

AVRoutePickerView* routePickerView;
UIButton* pickerButton;

RCT_EXPORT_MODULE()

- (UIView *)view
{
    routePickerView = [[AVRoutePickerView alloc] initWithFrame:CGRectMake(0.0f, 30.0f, 30.0f, 30.0f)];
    
    NSArray* subviews = [routePickerView subviews];
    for (UIView* subview in subviews) {
        if ([subview isKindOfClass:[UIButton class]]) {
            pickerButton = subview;
        }
    }
    
    return routePickerView;
}

RCT_EXPORT_VIEW_PROPERTY(activeTintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor);


RCT_EXPORT_METHOD(click)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [pickerButton sendActionsForControlEvents: UIControlEventTouchUpInside];
    });
}

@end
