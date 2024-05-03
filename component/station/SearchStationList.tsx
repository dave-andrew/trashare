import { useQuery, useRealm } from "@realm/react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Station } from "../../models/Station";
import SearchStationItem from "./SearchStationItem";
import { Results } from "realm";


export default function SearchStationList({setStation, search} : {setStation: React.Dispatch<React.SetStateAction<Station>>, search: string}) {

    const realm = useRealm()
    const locations = useQuery(Station)

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
            <FlatList
                className="flex-1 mt-32"
                data={filterStation}
                renderItem={({ item }) => {
                    return (
                        <SearchStationItem station={item} setStation={setStation} />
                    )
                }}
            >
