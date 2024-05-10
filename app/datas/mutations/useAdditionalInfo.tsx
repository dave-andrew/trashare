import { useContext } from "react"
import { User } from "../../../models/User"
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider"
import { Station } from "../../../models/Station"
import { History } from "../../../models/History"

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
        const { setAdditionalInfoInput } = useContext(AdditionalInfoContext)
        setAdditionalInfoInput(user)
    }

    const updateUserPoints = ({ user_id, points, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)

        const newUser = realm.write(() => {
            user.points = points
        })

        return user
    }

    const updateUserWasteData = ({ user_id, userWastes, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log('Updating ...', user);
        console.log(userWastes)

        realm.write(() => {
            user.paperWaste += userWastes.paperWeight
            user.recyclableWaste += userWastes.recylableWeight
            user.compostWaste += userWastes.compostWeight
            user.points += userWastes.totalPoint
        })

        console.log('Updated user points and waste info!')
        return user
    }

    const updateUserToStation = ({ user_id, station_id, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log(`Updating ... ${user}`);

        console.log(`Searching ... ${station_id}`);
        const station = realm.objectForPrimaryKey(Station, station_id)
        console.log(`Updating ... ${station}`);

        if (!user || !station) {
            return
        }
        realm.write(() => {
            user.role = "station"
            user.station = station
        })
        console.log(`Updated ... ${user.name} to ${user.station.name}`)
        return user
    }

    const finishOrderAndUpdateUser = ({ user_id, user_station_id, queue_id, wasteList, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log('Updating ...', user);

        console.log(`Updating ... ${user_station_id}`);
        const userStation = realm.objectForPrimaryKey(User, user_station_id)
        console.log('Updating ...', userStation);

        console.log(`Updating ... ${queue_id}`);
        const queue = realm.objectForPrimaryKey(History, queue_id)
        console.log('Updating ...', queue);

        if (!user || !queue || !userStation) {
            return
        }

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

        const data = realm.write(() => {
            user.paperWaste += paperWeight
            user.recyclableWaste += recylableWeight
            user.compostWaste += compostWeight
            user.points += totalPoint

            userStation.paperWaste += paperWeight
            userStation.recyclableWaste += recylableWeight
            userStation.compostWaste += compostWeight
            userStation.points += totalPoint

            queue.isComplete = true
            queue.waste = wasteList
        })
        return data
    }

    return {
        registerAdditionalInfo,
        updateProfilePicture,
        updateUserToStation,
        updateUserWasteData,
        finishOrderAndUpdateUser,
        updateUserPoints
    }
}
