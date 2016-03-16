Template.posts.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});

$(document).on('keyup', function( event ) {
  if (event.which === 73 && $('input:focus').length === 0) {
    Session.set('add', true);
  } else if (event.which === 27) {
    Session.set('add', false);
  }
});

UI.registerHelper('add', function () { return Session.get('add'); });

Template.add.onRendered(function () {
  $('textarea').focus();
});

Template.add.events({
  'click .cancel'() {
    Session.set('add');
  },
  'click .submit'(e, t) {
    var text = t.$('textarea').val().trim();
    if (text) {
      Meteor.call('addPost', {text: text});
      Session.set('add');
    }
  }
});
