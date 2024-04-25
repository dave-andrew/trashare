import Realm, {BSON, ObjectSchema} from "realm";
import { Location } from "./Location";

export class Geometry extends Realm.Object {

    static schema : ObjectSchema = {
        embedded: true,
        name: 'Geometry',
        properties: {
            location: 'Location'
        }
    }
}