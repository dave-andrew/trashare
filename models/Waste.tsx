import { ObjectSchema } from "realm";
import { Realm } from "realm";


export class Waste extends Realm.Object {
    wasteType: string = '';
    weight: number = 0;
    imageUrl: string = '';

    static schema : ObjectSchema = {
        name: 'Waste',
        embedded: true,
        properties: {
            wasteType: 'string',
            weight: {type: 'float', default: 0},
            imageUrl: 'string',
        }
    }
}
