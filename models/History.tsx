import Realm, { BSON, ObjectSchema } from 'realm'
import { Waste } from './Waste';
import { Station } from './Station';
import { User } from './User';

export class History extends Realm.Object {
    _id!: BSON.ObjectId;
    date!: Date;
    location!: Location;
    station!: Station;
    waste!: Waste[];
    driver!: User;
    orderer!: User;
    createdAt!: Date;
    isComplete!: boolean;

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
            isComplete: {type: 'bool', default: false},
            orderType: {type: 'string'}
        }
    }
}