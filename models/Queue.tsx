import Realm from "realm";


export class Queue extends Realm.Object {

    static schema = {
        name: 'Queue',
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