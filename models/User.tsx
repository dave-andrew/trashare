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
    static schema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            email: 'string',
            username: 'string',
            phone: 'string',
            points: 'int',
            createdAt: 'date',
            profileUrl: 'string',
        },
    };

    constructor(realm: Realm, { email, username, phone, points, profileUrl }: { email: string; username: string; phone: string; points: number; profileUrl: string }) {
        super(realm, User.schema);
        this._id = new BSON.ObjectID();
        this.email = email || '';
        this.username = username || '';
        this.phone = phone || '';
        this.points = points || 0;
        this.profileUrl = profileUrl || '';
    }
}