import Realm, {BSON, ObjectSchema} from "realm";

export class OpeningHours extends Realm.Object {

    static schema : ObjectSchema = {
        embedded: true,
        name: 'OpeningHours',
        properties: {
            open: 'string',
            close: 'string',
        }
    }
}