import Realm from 'realm';
import { User } from './User';

export class Message extends Realm.Object {
    text!: string;
    createdAt!: Date;
    user!: User;

    static schema: Realm.ObjectSchema = {
        name: 'Message',
        embedded: true,
        properties: {
            text: 'string',
            createdAt: 'date',
            user: 'User',
        },
    };
}