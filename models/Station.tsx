import Realm, { BSON, ObjectSchema } from "realm";
import { Geometry } from "./Geometry";
import { OpeningHours } from "./OpeningHours";
import { User } from "./User";


export class Station extends Realm.Object {
    _id: BSON.ObjectID;
    formattedAddress: string;
    geometry: Geometry;
    name: string;
    imageUrl: string;
    openingHours: OpeningHours;
    mainType: string;
    gmapUrl: string;

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'Station',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            formattedAddress: 'string',
            geometry: 'Geometry',
            imageUrl: { type: 'string', default: ''},
            name: 'string',
            openingHours: 'OpeningHours',
            mainType: 'string',
            gmapUrl: 'string',
        }
    }
}