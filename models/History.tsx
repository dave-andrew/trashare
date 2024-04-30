import Realm, { BSON, ObjectSchema } from 'realm'

export class History extends Realm.Object {

    static primaryKey = '_id';
    static schema: ObjectSchema = {
        name: 'History',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            date: 'date',
            location: 'Location',
            station: 'Station',
            waste: {
                type: 'list',
                objectType: 'Waste',
                optional: false
            },
            driver: 'User',
            orderer: 'User',
            createdAt: {type: 'date', default: new Date()},
        }
    }
}