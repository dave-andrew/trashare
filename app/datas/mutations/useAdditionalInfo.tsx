import { useContext } from "react"
import { User } from "../../../models/User"
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider"
import { Station } from "../../../models/Station"

export function useMutationAdditionalInfo() {
    // Use Mutation with Cache to the Context
    const registerAdditionalInfo = ({ user_id, username, phone, gender, realm, setStateContext}) => {
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

    const updateUserToStation = ({ user_id, station_id, realm }) => {
        console.log(`Updating ... ${user_id}`);
        const user = realm.objectForPrimaryKey(User, user_id)
        console.log(`Updating ... ${user}`);
        
        console.log(`Searching ... ${station_id}`);
        const station = realm.objectForPrimaryKey(Station, station_id)
        console.log(`Updating ... ${station}`);
        
        if(!user || !station) {
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
        updateUserToStation
    }
}
