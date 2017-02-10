import PouchDb from 'pouchdb';
import {Adapter} from 'ember-pouch';

const db = new PouchDb('todos');

export default Adapter.extend({
  db: db
});
