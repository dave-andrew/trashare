import Realm, { BSON, ObjectSchema } from 'realm';
import { Station } from './Station';


export class User extends Realm.Object {
    _id: string;
    username: string;
    phone: string;
    gender: string;
    points: number;
    paperWaste: number;
    recyclableWaste: number;
    compostWaste: number;
    createdAt: Date;
    profileUrl: string;
    role: string;
    station?: Station;

    static primaryKey = '_id';
    static schema : ObjectSchema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
            _id: 'string',
            username: 'string',
            phone: 'string',
            gender: 'string',
            points: { type: 'int', default: 0},
            createdAt: { type: 'date', default: new Date()},
            profileUrl: { type: 'string', default: 'https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/user-default.png?alt=media&token=f366dc07-b3f0-4657-9ffe-73fbef138a96'},
            paperWaste: { type: 'int', default: 0},
            recyclableWaste: { type: 'int', default: 0},
            compostWaste: { type: 'int', default: 0},
            role: { type: 'string', default: 'user'},
            station: 'Station'
        },
    };
}