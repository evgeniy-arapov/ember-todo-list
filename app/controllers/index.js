import Ember from 'ember';

export default Ember.Controller.extend({

  sortProp: ['_id:asc'],
  sortedModel: Ember.computed.sort( 'model', 'sortProp'),

  actions: {
    addTask(text) {
     return this.get('store').createRecord('todo-item', {
        title: text
      }).save();
    },
    removeTask(task) {
      task.deleteRecord();
      return task.save();
    }
  }
});
