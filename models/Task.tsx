import Realm, { BSON, index, ObjectSchema } from 'realm';

export class Task extends Realm.Object {
    _id = new BSON.ObjectID();
    description = '';
    isComplete = false;
    createdAt = new Date();
    userId = '';

    static primaryKey = '_id';
    static schema: ObjectSchema = {
        name: 'Task',
        primaryKey: '_id',
        properties: {
            _id: {type: 'objectId', default: () => new BSON.ObjectID()},
            description: 'string',
            isComplete: {
                type: 'bool',
                default: false,
                indexed: true,
            },
            createdAt: {
                type: 'date',
                default: new Date(),
            },
            userId: 'string',
        },
    };
}
