import Realm, {BSON, ObjectSchema} from "realm";


export interface OpeningHours {
    open: string;
    close: string;
}

export class OpeningHours extends Realm.Object {
    _id = '';
    open = '';
    close = '';

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'OpeningHours',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            open: 'string',
            close: 'string',
        }
    }
}