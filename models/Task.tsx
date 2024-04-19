import Realm, { BSON, ObjectSchema } from 'realm';

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
            _id: 'objectId',
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

    constructor(realm: Realm, { description, userId }: { description: string; userId: string }) {
        super(realm, Task.schema);
        this._id = new BSON.ObjectID();
        this.description = description || '';
        this.userId = userId || '';
    }
}
