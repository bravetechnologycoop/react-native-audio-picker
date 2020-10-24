#import "BRVAudioPickerEvents.h"

@implementation BRVAudioPickerEvents
{
    BOOL _hasListeners;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

static NSArray<NSString*>* _supportedEvents;

- (NSArray<NSString *>*)supportedEvents
{
    if(_supportedEvents == nil) {
        _supportedEvents = @[@"AudioDeviceChanged"];
    }
    return _supportedEvents;
}

- (void)startObserving
{
    if(!_hasListeners) {
        _hasListeners = YES;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(bridgeNotification:) name:nil object:nil];
    }
}

- (void)bridgeNotification:(NSNotification *)notification {
    if([[notification name] isEqualToString:@"AVAudioSessionRouteChangeNotification"]) {
        [self sendEventWithName:@"AudioDeviceChanged" body:[[[[[AVAudioSession sharedInstance] currentRoute] outputs] firstObject] portType]];
    }
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving
{
    if(_hasListeners)
    {
        [[NSNotificationCenter defaultCenter] removeObserver:self name:nil object:nil];
    }
    _hasListeners = NO;
}




RCT_EXPORT_MODULE()




@end
