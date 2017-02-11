import Ember from 'ember';

export default Ember.Object.extend({
  fromSeconds(seconds, format) {

    switch (format) {
      case "seconds": return seconds;
      case undefined: format = "HH:MM:SS"; break;
      case "HH:MM:SS":
      case "HH:MM": break;
      default: throw new Error("the second argument can have the values: 'HH:MM:SS', 'HH:MM', 'seconds'");
    }

    let h = Math.floor(seconds / 3600);
    let underHourSeconds = seconds % 3600;
    let m = Math.floor(underHourSeconds / 60);
    let s = Math.floor(underHourSeconds % 60);

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    if(format === "HH:MM"){
      return h + ":" + m;
    } else if(format === "HH:MM:SS") {
      return h + ":" + m + ":" + s;
    }
  },

  fromMs(ms, format) {
    let seconds = Math.floor( ms / 1000);
    return this.fromSeconds(seconds, format);
  }
});