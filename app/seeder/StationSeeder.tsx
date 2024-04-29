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
                        lat: -6.202000,
                        lng: 106.782000
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Compost"
            },
            {
                name: "Recycling Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: 40.785091,
                        lng: -73.968285
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Recyclable"
            },
            {
                name: "Trash Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: -6.2594,
                        lng: 106.7839
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Paper"
            }, 
            {
                name: "Landfill Station",
                formattedAddress: "Jl. Raya Bogor, No. 1, Jakarta",
                geometry: {
                    location: {
                        lat: -6.252300,
                        lng: 106.847336
                    }
                },
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Paper"
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
                mainType: "Recyclable"
            }
        ];

        stations.map(station => {
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