import { useQuery, useRealm } from "@realm/react"
import { Button, Text } from "react-native"
import { Station } from "../../models/Station";
import { useCallback, useEffect } from "react";

export default function StationSeeder() {

    const realm = useRealm();
    const stationList = useQuery(Station);
    console.log(stationList)

    const addStation = useCallback(
        (station) => {
            return realm.write(() => {
                return realm.create(Station, station);
            });
    }, [realm, stationList])

    const seedStations = async () => {
        const stations = [
            {
                name: "Compostable Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: 37.78825,
                        lng: -122.4324
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                rating: 4.5
            },
            {
                name: "Recycling Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: 37.78825,
                        lng: -122.4324
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                rating: 4.5
            },
            {
                name: "Trash Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: 37.78825,
                        lng: -122.4324
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                rating: 4.5
            }, 
            {
                name: "Landfill Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: 37.78825,
                        lng: -122.4324
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                rating: 4.5
            },
            {
                name: "E-Waste Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: 37.78825,
                        lng: -122.4324
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },  
                rating: 4.5
            }
        ];

        const stationData = stations.map(station => {
            return addStation(station);
        })
        
    };

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(stationList);
        })
    }, [realm, stationList])

    return (
        <>
            <Text>StationSeeder</Text>
            <Button title="try add new data" onPress={seedStations}></Button>
        </>
    )
}