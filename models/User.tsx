import Realm, { BSON } from 'realm';


export class User extends Realm.Object {
    _id = new BSON.ObjectID();
    email = '';
    username = '';
    phone = '';
    points = 0;
    createdAt = new Date();
    profileUrl = '';

    static primaryKey = '_id';
}