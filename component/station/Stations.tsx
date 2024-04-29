import { useQuery, useRealm } from "@realm/react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";
import { Station } from "../../models/Station";
import StationList from "./StationList";


export default function Stations({setStation} : {setStation: any}) {

    const realm = useRealm()
    const locations = useQuery(Station)

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(locations)
        })
    }, [])


    return (
        <View className="flex-1">
            <FlatList
                className="flex-1 mt-32"
                data={locations}
                renderItem={({ item }) => {
                    return (
                        <StationList station={item} setStation={setStation} />
                    )
                }}
            >

            </FlatList>
        </View>
    )
}