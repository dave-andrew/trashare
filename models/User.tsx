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
            profileUrl: { type: 'string', default: ''},
            paperWaste: { type: 'int', default: 0},
            recyclableWaste: { type: 'int', default: 0},
            compostWaste: { type: 'int', default: 0},
        },
    };
}