import Realm, {BSON, ObjectSchema} from "realm";


export interface Location {
    lat: number;
    lng: number;
}


export class Location extends Realm.Object {
    _id = '';
    lat = 0;
    lng = 0;

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'Location',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            lat: 'int',
            lng: 'int',
        }
    }
}