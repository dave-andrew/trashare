import { useQuery, useRealm } from "@realm/react"
import { Button, Text } from "react-native"
import { Station } from "../../models/Station";
import { useCallback, useEffect } from "react";

export default function StationSeeder() {

    const realm = useRealm();
    const stationList = useQuery(Station);
    // console.log(stationList)

    const addStation = useCallback(
        (station) => {
            return realm.write(() => {
                return realm.create(Station, station);
            });
    }, [realm, stationList])

    const seedStations = async () => {
        const stations = [
            {
                name: "Rekosistem Compostable Station",
                formattedAddress: "Senayan, Kebayoran Baru, South Jakarta City, Jakarta 12190",
                geometry: {
                    location: {
                        lat: 6.212831,
                        lng: 106.810177
                    }
                },
                imageUrl: "",
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Recyclable"
            },
            {
                name: "Food Cycle Station",
                formattedAddress: "Jl. Kh. Ahmad Dahlan No.9a, RT.12/RW.8, Palmeriam, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13140",
                geometry: {
                    location: {
                        lat: 6.210744,
                        lng: 106.844341
                    }
                },
                imageUrl: "",
                openingHours: {
                    open: "07:00",
                    close: "15:00"
                },
                mainType: "Compost"
            },
            {
                name: "Rebricks Indonesia",
                formattedAddress: "Jl. Ciputat Raya No.79, RT.5/RW.6, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310",
                geometry: {
                    location: {
                        lat: 6.271111,
                        lng: 106.782222
                    }
                },
                imageUrl: "",
                openingHours: {
                    open: "08:30",
                    close: "19:00"
                },
                mainType: "Recyclable"
            }, 
            {
                name: "Arah Environmental Indonesia",
                formattedAddress: "Jl. Tulodong Bawah II No.3, RT.3/RW.1, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12191",
                geometry: {
                    location: {
                        lat: 6.241311,
                        lng: 106.803111
                    }
                },
                imageUrl: "",
                openingHours: {
                    open: "09:00",
                    close: "17:00"
                },
                mainType: "Paper"
            },
            {
                name: "Eco Paper Station",
                formattedAddress: "Kp. Padaasih RT. 009 / 004, Padaasih, Padaasih, Kec. Subang, Kabupaten Subang, Jawa Barat 41285",
                geometry: {
                    location: {
                        lat: -8.65,
                        lng: 115.216667
                    }
                },
                openingHours: {
                    open: "12:00",
                    close: "15:00"
                },  
                mainType: "Paper"
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