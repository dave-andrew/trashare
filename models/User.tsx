import Realm, { BSON, ObjectSchema } from 'realm';


export class User extends Realm.Object {
    _id = new BSON.ObjectID();
    username = '';
    phone = '';
    gender = '';
    points = 0;
    paperWaste=0;
    recyclableWaste=0;
    compostWaste=0;
    createdAt = new Date();
    profileUrl = '';
    role = '';

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
            _id: 'string',
            username: 'string',
            phone: 'string',
            gender: 'string',
            points: { type: 'int', default: 0},
            createdAt: { type: 'date', default: new Date()},
            profileUrl: { type: 'string', default: 'https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/user-default.jpg?alt=media&token=67be8ce8-3fa2-4812-9749-aa3afb8f468d'},
            paperWaste: { type: 'int', default: 0},
            recyclableWaste: { type: 'int', default: 0},
            compostWaste: { type: 'int', default: 0},
            history: { type: 'list', objectType: 'History', default: []},
            role: { type: 'string', default: 'user'}
        },
    };
}