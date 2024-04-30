import { ObjectSchema } from "realm";
import { Realm } from "realm";


export class Waste extends Realm.Object {

    static schema : ObjectSchema = {
        name: 'Waste',
        embedded: true,
        properties: {
            wasteType: 'string',
            weight: 'float',
            imageUrl: 'string',
        }
    }
}