import Realm, {BSON, ObjectSchema} from "realm";


export interface Viewport {
    northeast: Location;
    southwest: Location;
}

export class Viewport extends Realm.Object {
    _id = '';
    northeast = {} as Location;
    northwest = {} as Location;

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'Viewport',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            northeast: 'Location',
            northwest: 'Location',
        }
    }
}