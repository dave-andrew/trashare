import Realm, { ObjectSchema } from "realm";


export class Queue extends Realm.Object {

    static primaryKey = '_id';
    static schema: ObjectSchema = {
        name: 'Queue',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            user: 'User',
            driver: 'User',
            station : 'Station',
            location: 'Location',
            createdAt: {type: 'date', default: new Date()},
        }
    }
}