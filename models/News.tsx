import Realm, { BSON, ObjectSchema } from 'realm';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'


export class News extends Realm.Object {
    createdAt = new Date();

    static primaryKey = '_id';
    static schema: ObjectSchema = {
        name: 'News',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new BSON.ObjectID() },
            title: 'string',
            imageLink: 'string',
            newsLink: 'string',
            createdAt: { type: 'date', default: new Date() },
        },
    };
}