import Realm, { BSON, ObjectSchema } from "realm";


export class Station extends Realm.Object {

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'Station',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            formattedAddress: 'string',
            geometry: 'Geometry',
            name: 'string',
            openingHours: 'OpeningHours',
            rating: 'float',
        }
    }
}