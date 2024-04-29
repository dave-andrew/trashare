import { User } from "../../models/User"

export default function useAdditionalInfo() {
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
    return {
        registerAdditionalInfo
    }
}