import Realm, {ObjectSchema} from "realm";

export class Location extends Realm.Object {
    lat!: number;
    lng!: number;
    
    static schema : Realm.ObjectSchema = {
        embedded: true,
        name: 'Location',
        properties: {
            lat: 'double',
            lng: 'double',
        }
    }
}