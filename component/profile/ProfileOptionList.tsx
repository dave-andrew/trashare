import { View } from "react-native";
import { User } from "../../models/User";
import ProfileOption from "./ProfileOption";


export default function ProfileOptionList(props: { userAdditionalInfo: User }) {
    return (
        <View className="m-2">
            <ProfileOption menu="points" points={props.userAdditionalInfo.points} />
        </View>
    )
}