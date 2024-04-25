import Realm, { BSON, ObjectSchema } from "realm";
import Moment from "moment";
import {OpeningHours} from "./OpeningHours";
import {Geometry} from "./Geometry";

interface Place {
    _id: string;
    formattedAddress: string;
    geometry: Geometry;
    name: string;
    openingHours: OpeningHours;
    rating: number;
}


export class Station extends Realm.Object {
    
    _id = '';
    formattedAddress = '';
    geometry = {} as Geometry;
    name = '';
    openingHours = {} as OpeningHours;
    rating = 0;

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