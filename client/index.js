Template.main.onRendered(function () {
  Tracker.autorun(function () {
    if (Session.equals('visible', 'visible')) {
      console.log('bigtext');
      $('.bigtext').bigtext();
    }
  });
});

Template.posts.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});

$(document).on('keyup', function( event ) {
  if ($('textarea:focus').length === 0) {
    if (event.which === 65) {
      Session.set('edit');
      Session.set('editing');
      Session.set('add', true);
    } else if (event.which === 69) {
      Session.set('add');
      Session.set('editing');
      Session.set('edit', !Session.get('edit'));
    }
  }
});

UI.registerHelper('add', function () { return Session.get('add'); });
UI.registerHelper('edit', function () { return Session.get('edit'); });
UI.registerHelper('editing', function () { return Session.equals('editing', this._id); });

Template.add.onRendered(function () {
  $('textarea').focus();
});

Template.add.events({
  'click .cancel'() {
    Session.set('add');
    Session.set('editing');
  },
  'click .submit'(e, t) {
    var text = t.$('textarea').val().trim();
    if (text) {
      Meteor.call('addPost', {_id: this._id, text: text});
      Session.set('add');
      Session.set('editing');
    }
  }
});

Template.title.events({
  'click .add'(ev) {
    ev.preventDefault();
    Session.set('edit');
    Session.set('editing');
    Session.set('add', true);
  },
  'click .edit'(ev) {
    ev.preventDefault();
    Session.set('add');
    Session.set('editing');
    Session.set('edit', !Session.get('edit'));
  }
});

Template.edit.events({
  click(ev) {
    ev.preventDefault();
    console.log('edit', this);
    Session.set('editing', this._id);
  }
});
