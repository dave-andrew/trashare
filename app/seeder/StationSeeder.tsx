import { useRealm } from "@realm/react"
import { Button, Text } from "react-native"
import { Station } from "../../models/Station";

export default function StationSeeder() {

    const realm = useRealm();

    const seedStations = async () => {
        const stations = [
            {
                name: "Compostable Station",
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
            return realm.write(() => {
                return realm.create(Station, station);
            });
        })

        // console.log(stationData);
    };

    return (
        <>
            <Text>StationSeeder</Text>
            <Button title="try add new data" onPress={seedStations}></Button>
        </>
    )
}