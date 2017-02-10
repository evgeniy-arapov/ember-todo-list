import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['todo-list'],
  inputValue: '',

  actions: {
    onEnter (value) {
      this.get("addTask")(value)
        .then(() => {
          this.set('inputValue', '');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
