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
            profileUrl: { type: 'string', default: 'https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/default-user.png?alt=media&token=7db015cf-943d-42fe-8370-744febfcee8a'},
            paperWaste: { type: 'int', default: 0},
            recyclableWaste: { type: 'int', default: 0},
            compostWaste: { type: 'int', default: 0},
            role: { type: 'string', default: 'user'},
            station: 'Station'
        },
    };
}