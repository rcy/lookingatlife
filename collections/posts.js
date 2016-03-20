Posts = new Mongo.Collection('posts');

Meteor.methods({
  addPost(options) {
    check(options, {text: String, _id: Match.Optional(String)});
    if (options._id) {
      return Posts.update({ _id: options._id },
                          { $set: {text: options.text, updatedAt: new Date() }});
    } else {
      return Posts.insert({ text: options.text, createdAt: new Date() });
    }
  },
  deletePost(options) {
    check(options, {_id: String});
    return Posts.remove({_id: options._id});
  }
});
