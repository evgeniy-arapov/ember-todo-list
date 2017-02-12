import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['todo-item'],
  tagName: 'tr',
  statuses: ["none", "complete", "noComplete", "inProgress"],

  init() {
    this._super(...arguments);
    this.set('now', new Date());
  },

  didInsertElement() {
    if (this.get('task.status') === 'inProgress') {
      this.send('timerOn');
    }
  },

  duration: Ember.computed('now', function () {
    let timeInProgress = this.get('task.timeInProgress');

    if (!this.get('task.startInProgress')) {
      return timeInProgress;
    }
    else {
      let startInProgress = this.get('task.startInProgress');
      let now = this.get('now');
      return timeInProgress + (now - startInProgress);
    }
  }),

  actions: {
    handleChangeStatus(event) {
      let status = event.target.value;
      let task = this.get('task');

      task.set('status', status);

      if (status === 'inProgress') {
        task.set('startInProgress', new Date());
        this.send('timerOn');
      }
      else if (task.startInProgress !== null) {
        task.set('timeInProgress', this.get('duration'));
        task.set('startInProgress', null);
        this.send('timerOff');
      }

      task.save()
        .catch((err) => {
          console.log(err);
        });
    },

    handleRemoveTask() {
      this.get('removeTask')(this.get('task'))
        .catch(err => {
          console.log(err);
        });
    },

    timerOn() {
      this.set('timerId', setInterval(() => {
        this.set('now', new Date());
      }, 1000));
    },

    timerOff() {
      clearInterval(this.get('timerId'));
    }
  },

  willDestroyElement() {
    let timerId = this.get("timerId");
    if (timerId) {
      clearInterval(timerId);
    }
  }
});