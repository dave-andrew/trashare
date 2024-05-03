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
        if (stationList.length > 0) {
            console.log("Station already seeded");
            return;
        }

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
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-rekosistem-1.jpg?alt=media&token=83cb28de-66cc-4781-901a-30cea2590391",
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
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-foodcyle-2.png?alt=media&token=a14bfa5d-1730-40ae-9b9e-980fc27a0b0b",
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
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-rebricks-3.png?alt=media&token=2d8a3913-9c62-4b4e-b0db-5b59da6b6925",
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
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Farah-environmental-4.png?alt=media&token=fdea6e12-b3b3-4db0-b1cc-29a097b70bba",
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
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-ecopaper-5.png?alt=media&token=de5a3a5b-70dd-4d65-8623-0737f19a5a60",
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