import { useContext } from "react"
import { User } from "../../../models/User"
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider"
import { Station } from "../../../models/Station"

export function useMutationAdditionalInfo() {
    // Use Mutation with Cache to the Context
    const registerAdditionalInfo = ({ user_id, username, phone, gender, realm, setStateContext }) => {
        const newUser = realm.write(() => {
            return realm.create(User, {
                _id: user_id,
                gender: gender,
                username: username,
                phone: phone
            })
        })
        console.log(`Registered ... ${newUser.username}`)

        setStateContext(newUser)
    }

    const updateProfilePicture = ({ user_id, profileUrl, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log(`Updating ... ${user}`);

        realm.write(() => {
            user.profileUrl = profileUrl
        })
        console.log(`Updated ... ${user.username}`)

        // Update cache
        const { setAdditionalInfoInput } = useContext(AdditionalInfoContext)
        setAdditionalInfoInput(user)
    }

    const updateUserWasteData = ({ user_id, user_station_id, wasteList, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log(`Updating ... ${user}`);

        console.log(`Updating ... ${user_station_id}`);
        const stationUser = realm.objectForPrimaryKey(User, user_station_id)
        console.log(`Updating ... ${user}`);

        let paperWeight = 0
        let recylableWeight = 0
        let compostWeight = 0
        let totalPoint = 0

        wasteList.forEach(waste => {
            if (waste.wasteType === 'Paper') {
                paperWeight += waste.weight
                totalPoint += waste.weight * 2
            } else if (waste.wasteType === 'Recyclable') {
                recylableWeight += waste.weight
                totalPoint += waste.weight * 1
            } else {
                compostWeight += waste.weight
                totalPoint += waste.weight * 7
            }
        });

        realm.write(() => {
            user.paperWaste += paperWeight
            user.recyclableWaste += recylableWeight
            user.compostWaste += compostWeight
            user.points += totalPoint

            stationUser.paperWaste += paperWeight
            stationUser.recyclableWaste += recylableWeight
            stationUser.compostWaste += compostWeight
        })
        console.log('Updated user points and waste info!')
        return { user, stationUser }
    }

    const updateUserToStation = ({ user_id, station_id, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log(`Updating ... ${user}`);

        console.log(`Searching ... ${station_id}`);
        const station = realm.objectForPrimaryKey(Station, station_id)
        console.log(`Updating ... ${station}`);

        if (!user || !station) {
            console
            return
        }
        realm.write(() => {
            user.role = "station"
            user.station = station
        })
        console.log(`Updated ... ${user.name} to ${user.station.name}`)
        return user
    }

    return {
        registerAdditionalInfo,
        updateProfilePicture,
        updateUserToStation,
        updateUserWasteData
    }
}
