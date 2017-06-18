({
  onInit : function(component, event, helper) {
    component.set('v.notifications', [
      {time: '00:01', message: 'Greetings Trailblazer!'},
      {time: '00:02', message: 'Congratulations on building this first version of the app.'},
      {time: '00:03', message: 'Beware of the bears.'}
    ]);

    helper.displayToast(component, 'success', 'Ready to receive notifications.');
  },

  onClear : function(component, event, helper) {
    component.set('v.notifications', []);
    },

  onToggleMute : function(component, event, helper) {
    var isMuted = component.get('v.isMuted');
    component.set('v.isMuted', !isMuted);
    helper.displayToast(component, 'success', 'Notifications '+ ((!isMuted) ? 'muted' : 'unmuted') +'.');
    }
})