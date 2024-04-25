import Realm, { BSON, ObjectSchema } from "realm";
import {OpeningHours} from "./OpeningHours";
import {Geometry} from "./Geometry";

<<<<<<< HEAD
interface Place {
    _id: string;
    formattedAddress: string;
    geometry: Geometry;
    name: string;
    openingHours: OpeningHours;
    rating: number;
}


=======
>>>>>>> ff13a8a25ebb1a2f844be7b346493f1e6ec1fc36
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