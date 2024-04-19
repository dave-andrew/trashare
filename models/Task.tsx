import Realm, { BSON, ObjectSchema } from 'realm';

export class Task extends Realm.Object {
    _id = new BSON.ObjectID();
    description = '';
    isComplete = false;
    createdAt = new Date();
    userId = '';

    static primaryKey = '_id';
}
