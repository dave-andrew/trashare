import Realm, { BSON, ObjectSchema } from 'realm';


export class News extends Realm.Object {
    _id = new BSON.ObjectID();
    title = '';
    imageLink = '';
    newsLink = '';
    createdAt = new Date();

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'News',
        primaryKey: '_id',
        properties: {
            _id: {type: 'objectId', default: new BSON.ObjectID()},
            title: 'string',
            imageLink: 'string',
            newsLink: 'string',
            createdAt: { type: 'date', default: new Date()},
        },
    };
}