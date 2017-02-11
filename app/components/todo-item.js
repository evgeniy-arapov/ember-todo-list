import Ember from 'ember';
import TimeFormat from '../utils/time-format';

export default Ember.Component.extend({
  classNames: ['todo-item'],
  tagName: 'tr',
  statuses: ["none", "complete", "noComplete", "inProgress"],

  init() {
    this._super(...arguments);
    this.set('timeFormat', TimeFormat.create());
  },

  didInsertElement() {
    this.timer();
  },

  timer() {
    let task = this.get('task');
    let timeInProgress = task.get('timeInProgress');
    let startInProgress = task.get('startInProgress');

    if(task.get('status') === 'inProgress') {
      this.set('timerId', Ember.run.later(() => {
        let now = new Date();
        let timeElapsed = timeInProgress + (now - startInProgress);
        this.set("duration", this.timeFormat.fromMs(timeElapsed));
        this.timer();
      }, 1000));
    }
    else {
      this.set('duration', this.timeFormat.fromMs(timeInProgress));
    }
  },

  actions: {
    changeStatus(event) {
      let status = event.target.value;
      let task = this.get('task');
      task.set('status', status);

      if( status === 'inProgress') {
        task.set('startInProgress', new Date());
        this.timer();
      }
      else if (task.startInProgress !== null) {
        let timeInProgress = task.get('timeInProgress');
        let startInProgress = task.get('startInProgress');
        let now = new Date();
        let newTimeInProgress = timeInProgress + (now - startInProgress);
        task.set('timeInProgress', newTimeInProgress);
        task.set('startInProgress', null);
        Ember.run.cancel(this.get('timerId'));
      }

      task.save()
        .catch((err) => {
          console.log(err);
        });
    },

    removeTask() {
      this.get('removeTask')(this.get('task'))
        .catch(err => {
          console.log(err);
        });
    }
  },

  willDestroyElement() {
    let timerId = this.get("timerId");
    if(timerId) {
      Ember.run.cancel(timerId);
    }
  }
});