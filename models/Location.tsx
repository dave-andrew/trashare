import Realm, {BSON, ObjectSchema} from "realm";

export class Location extends Realm.Object {

    static schema : ObjectSchema = {
        embedded: true,
        name: 'Location',
        properties: {
            lat: 'double',
            lng: 'double',
        }
    }
}