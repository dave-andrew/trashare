import { useRealm } from "@realm/react"
import { Button, Text } from "react-native"
import { Station } from "../../models/Station";

export default function StationSeeder() {

    const realm = useRealm();

    const seedStation = async () => {
        const seedStation = realm.write(() => {
            return realm.create(Station,
                {
                    
                }
            )
        })

        console.log(seedStation);
    }

    return (
        <>
            <Text>StationSeeder</Text>
            <Button title="try add new data" onPress={seedStation}></Button>
        </>
    )
}