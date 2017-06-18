({
    onCometdLoaded: function (component, event, helper) {
        var cometd = new org.cometd.CometD();
        component.set('v.cometd', cometd);
        if (component.get('v.sessionId') != null)
            helper.connectCometd(component);
    },
    
    onInit: function (component, event, helper) {
        component.set('v.cometdSubscriptions', []);
        component.set('v.notifications', []);

        // Disconnect CometD when leaving page
        window.addEventListener('unload', function (event) {
            helper.disconnectCometd(component);
        });

        // Retrieve session id
        var action = component.get('c.getSessionId');
        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set('v.sessionId', response.getReturnValue());
                if (component.get('v.cometd') != null)
                    helper.connectCometd(component);
            } else
                console.error(response);
        });
        $A.enqueueAction(action);

        helper.displayToast(component, 'success', 'Ready to receive notifications.');
    },

    onClear: function (component, event, helper) {
        component.set('v.notifications', []);
    },

    onToggleMute: function (component, event, helper) {
        var isMuted = component.get('v.isMuted');
        component.set('v.isMuted', !isMuted);
        helper.displayToast(component, 'success', 'Notifications ' + ((!isMuted) ? 'muted' : 'unmuted') + '.');
    }
})