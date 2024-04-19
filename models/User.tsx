import Realm, { BSON, ObjectSchema } from 'realm';


export class User extends Realm.Object {
    _id = new BSON.ObjectID();
    email = '';
    username = '';
    phone = '';
    points = 0;
    createdAt = new Date();
    profileUrl = '';

    
    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            email: 'string',
            username: 'string',
            phone: 'string',
            points: 'int',
            createdAt: {
                type: 'date',
                default: new Date(),
            },
            profileUrl: 'string',
        },
    };

    constructor(realm, { email, username, phone }) {
        super(realm, User.schema);
        this._id = new BSON.ObjectID();
        this.email = email || '';
        this.username = username || '';
        this.phone = phone;
        this.points = 0;
        this.profileUrl = '';
    }

}