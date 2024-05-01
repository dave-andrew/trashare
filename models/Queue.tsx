import Realm, { BSON } from "realm";


export class Queue extends Realm.Object {

    static schema = {
        name: 'Queue',
        primaryKey: '_id',
        properties: {
            _id: {type: 'objectId', default: () => new BSON.ObjectID()},
            user: 'User',
            driver: 'User',
            station : 'Station',
            location: 'Location',
            createdAt: {type: 'date', default: new Date()},
        }
    }
}