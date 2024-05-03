import Realm, {BSON, ObjectSchema} from "realm";

export class OpeningHours extends Realm.Object {
    open!: string;
    close!: string;

    static schema : ObjectSchema = {
        embedded: true,
        name: 'OpeningHours',
        properties: {
            open: 'string',
            close: 'string',
        }
    }
}