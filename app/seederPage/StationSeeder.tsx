import { useRealm } from "@realm/react"
import { Button, Text } from "react-native"
import { Station } from "../../models/Station";
import { useCallback, useEffect } from "react";
import { getStations } from "../datas/queries/useQueries";
import { useStationMutation } from "../datas/mutations/useMutations";

export default function StationSeeder() {

    const realm = useRealm();
    const stationList = getStations(realm);

    const { addStation } = useStationMutation(realm, stationList);

    const seedStations = async () => {
        if (stationList.length > 0) {
            console.log("Station already seeded");
            return;
        }

        const stations = [
            {
                name: "Rekosistem Waste Station",
                formattedAddress: "Jl. Sultan Hasanuddin Dalam No.Dalam 3, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130",
                geometry: {
                    location: {
                        lat: -6.24273765291744,
                        lng: 106.80004940914081
                    }
                },
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-rekosistem-1.jpg?alt=media&token=83cb28de-66cc-4781-901a-30cea2590391",
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Recyclable",
                gmapUrl: "https://maps.app.goo.gl/Py2fCKshPB9z2UFi6"
            },
            {
                name: "FoodCyle Hub",
                formattedAddress: "Jl. Kh. Ahmad Dahlan No.9a, RT.12/RW.8, Palmeriam, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13140",
                geometry: {
                    location: {
                        lat: -6.2053303686171555,
                        lng: 106.8606197496204
                    }
                },
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-foodcyle-2.png?alt=media&token=a14bfa5d-1730-40ae-9b9e-980fc27a0b0b",
                openingHours: {
                    open: "08:00",
                    close: "17:00"
                },
                mainType: "Compost",
                gmapUrl: "https://maps.app.goo.gl/7TLPXb6DcukFfHF68"
            },
            {
                name: "Rebricks Indonesia",
                formattedAddress: "Jl. Ciputat Raya No.79, RT.5/RW.6, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310",
                geometry: {
                    location: {
                        lat: -6.272899937164029,
                        lng: 106.77487602295945
                    }
                },
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-rebricks-3.png?alt=media&token=2d8a3913-9c62-4b4e-b0db-5b59da6b6925",
                openingHours: {
                    open: "08:30",
                    close: "05:00"
                },
                mainType: "Recyclable",
                gmapUrl: "https://maps.app.goo.gl/eb3zMeyB24ZVnF5B6"
            },
            {
                name: "Arah Environmental Indonesia",
                formattedAddress: "Jl. Tulodong Bawah II No.3, RT.3/RW.1, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12191",
                geometry: {
                    location: {
                        lat: -6.229873847364639,
                        lng: 106.81187119351236
                    }
                },
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Farah-environmental-4.png?alt=media&token=fdea6e12-b3b3-4db0-b1cc-29a097b70bba",
                openingHours: {
                    open: "09:00",
                    close: "17:00"
                },
                mainType: "Paper",
                gmapUrl: "https://maps.app.goo.gl/RV2ZoxCEJ6Pt6ChM7"
            },
            {
                name: "PT Eco Paper Indonesia",
                formattedAddress: "Kp. Padaasih RT. 009 / 004, Padaasih, Padaasih, Kec. Subang, Kabupaten Subang, Jawa Barat 41285",
                geometry: {
                    location: {
                        lat: -6.545913669982479,
                        lng: 107.83769418563794
                    }
                },
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/profile-pictures%2Fstation-ecopaper-5.png?alt=media&token=de5a3a5b-70dd-4d65-8623-0737f19a5a60",
                openingHours: {
                    open: "12:00",
                    close: "15:00"
                },
                mainType: "Paper",
                gmapUrl: "https://maps.app.goo.gl/bjKxaDd3dmTvPVeS7"
            }
        ];

        stations.map(station => {
            return addStation(station);
        })
    };

    return (
        <>
            <Text>StationSeeder</Text>
            <Button title="try add new data" onPress={seedStations}></Button>
        </>
    )
}