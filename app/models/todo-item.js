import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('date', { defaultValue() { return new Date(); } } ),
  title : DS.attr('string'),
  status: DS.attr('string', { defaultValue: "none"}),
  timeInProgress: DS.attr('number', { defaultValue: 0}),
  startInProgress: DS.attr('date'),
  rev   : DS.attr('string')
});
