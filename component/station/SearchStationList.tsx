import { useRealm } from "@realm/react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Station } from "../../models/Station";
import SearchStationItem from "./SearchStationItem";
import { Results } from "realm";
import { getStations } from "../../app/datas/queries/useQueries";


export default function SearchStationList({ setStation, search }: { setStation: React.Dispatch<React.SetStateAction<Station>>, search: string }) {

    const realm = useRealm()
    const locations = getStations(realm)
    // console.log("Locations", locations)

    const [filterStation, setFilterStation] = useState<Results<Station>>(locations)

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(locations)
        })
    }, [])

    useEffect(() => {
        setFilterStation(locations.filtered(`name CONTAINS[c] "${search}"`))
    }, [search])

    return (
        <View className="flex-1">
            {filterStation.length > 0 ?
                <FlatList
                    className="flex-1 mt-28"
                    data={filterStation}
                    renderItem={({ item }) => {
                        return (
                            <SearchStationItem station={item} setStation={setStation} />
                        )
                    }}
                />
                :
                <Text className="text-center text-sm text-gray-500 mt-28">No Station Found</Text>
            }
        </View>
    )
}
