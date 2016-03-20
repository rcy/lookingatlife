Meteor.startup(function () {
  Session.set('visible');

  function visible () {
    console.log('visible!');
    Session.set('visible', 'visible');
  }

  FontFaceOnload("vanillaregular", {
    success: function() {
      console.log('font success');
      visible();
    },
    error: function() {
      console.error('ff error', arguments);
      visible();
    },
    timeout: 5000 // in ms. Optional, default is 10 seconds
  });
});

UI.registerHelper('visible', function () {
  return Session.get('visible');
});
