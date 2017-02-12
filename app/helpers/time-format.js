import Ember from 'ember';
import TimeFormat from '../utils/time-format';

export function timeFormat([time, ...rest], { format = "HH:MM:SS", timeIn = "ms" }) {
  let timeFormat = TimeFormat.create();

  if('ms' === timeIn){
    return timeFormat.fromMs(time, format);
  }
  else if('s' === timeIn){
    return timeFormat.fromSeconds(time, format);
  }
  else {
    throw new Error("unknown timeIn format, use 's' or 'ms'");
  }
}

export default Ember.Helper.helper(timeFormat);
