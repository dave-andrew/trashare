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
            profileUrl: { type: 'string', default: ''},
            paperWaste: { type: 'int', default: 0},
            recyclableWaste: { type: 'int', default: 0},
            compostWaste: { type: 'int', default: 0},
            history: { type: 'list', objectType: 'History', default: []},
            role: { type: 'string', default: 'user'},
            station: 'Station'
        },
    };
}