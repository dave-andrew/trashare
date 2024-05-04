import Realm, { BSON } from 'realm';
import { Message } from './Message';
import { Station } from './Station';
import { User } from './User';

export class Chat extends Realm.Object {
    _id!: BSON.ObjectID;
    user!: User;
    station!: Station;
    message!: Message[];

    static primaryKey = '_id';
    static schema : Realm.ObjectSchema = {
        name: 'Chat',
        primaryKey: '_id',
        properties: {
            _id: { type: "objectId", default: new BSON.ObjectID() },
            user: 'User',
            station: 'Station',
            message : { type: 'list', objectType: 'Message' }
        }
    }
}