import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['todo-item'],
  tagName: 'tr',
  statuses: ["none", "complete", "noComplete", "inProgress"],

  didInsertElement() {
    this.timer();
  },

  getTimefromSecs(seconds, format){
    if(format === "seconds"){
      return seconds;
    }
    var h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    if(format === "HH:MM"){
      return h + ":" + m;
    } else if(format === "HH:MM:SS") {
      return h + ":" + m + ":" + s;
    }
  },

  timer() {
    let task = this.get('task');
    let timeInProgress = task.get('timeInProgress');
    let startInProgress = task.get('startInProgress');

    if(task.get('status') === 'inProgress') {
      this.set('timerId', Ember.run.later(() => {
        let now = new Date();
        let timeElapsed = timeInProgress + (now - startInProgress);
        let secs = Math.floor(timeElapsed / 1000);
        this.set("duration", this.getTimefromSecs(secs, "HH:MM:SS"));
        this.timer();
      }, 1000));
    }
    else {
      let secs = Math.floor(task.get('timeInProgress')/1000);
      this.set('duration', this.getTimefromSecs(secs, "HH:MM:SS"));
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