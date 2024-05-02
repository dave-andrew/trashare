import Realm, { BSON, ObjectSchema } from 'realm'
import { Waste } from './Waste';
import { Station } from './Station';
import { User } from './User';
import { Location } from './Location';

export class History extends Realm.Object {
    _id!: BSON.ObjectId;
    location!: Location;
    station!: Station;
    waste!: Waste[];
    driver!: User;
    orderType!: string;
    orderer!: User;
    createdAt!: Date;
    isComplete!: boolean;

    static primaryKey = '_id';
    static schema: ObjectSchema = {
        name: 'History',
        primaryKey: '_id',
        properties: {
            _id: {type: 'objectId', default: () => new BSON.ObjectId()},
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