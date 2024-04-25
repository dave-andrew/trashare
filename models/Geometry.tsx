import Realm, {BSON, ObjectSchema} from "realm";
import {Viewport} from "./Viewport";

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export class Geometry extends Realm.Object {
    _id = '';
    location = {} as Location;
    viewport = {} as Viewport;

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'Geometry',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            location: 'Location',
            viewPort: 'Viewport',
        }
    }
}