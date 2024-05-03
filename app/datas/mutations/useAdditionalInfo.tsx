import { useContext } from "react"
import { User } from "../../../models/User"
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider"

export function useMutationAdditionalInfo() {
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

        // Update cache
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
    return {
        registerAdditionalInfo,
        updateProfilePicture,
    }
}
