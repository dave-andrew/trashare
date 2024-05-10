import { Linking, View } from "react-native";
import { User } from "../../models/User";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileOption from "./ProfileOption";
import { useEmailPasswordAuth, useQuery, useRealm } from "@realm/react";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { useUserMutation } from "../../app/datas/mutations/useMutations";
import { useMutationAdditionalInfo } from "../../app/datas/mutations/useAdditionalInfo";


export default function ProfileOptionList(props: { additionalInfo: User }) {

    const realm = useRealm();

    const { logOut } = useEmailPasswordAuth();
    const { updateUserPoints } = useMutationAdditionalInfo()
    
    const customerSupportPhone = '6281234567890';
    const router = useRouter();
    const handleLogout = () => {
        logOut()
        router.push('/auth')
    }

    return (
        <View className="m-4">
            <ProfileOption menu="Total Points" icon={<FontAwesome size={28} name="database" color={'#656565'} />} points={props.additionalInfo?.points} 
            onPress={() => updateUserPoints({
                user_id: props.additionalInfo._id,
                points: 0,
                realm: realm
            })}
            station={props.additionalInfo.station}/>
            <ProfileOption menu="Frequently asked questions" icon={<FontAwesome size={28} name="question-circle" color={'#656565'} />} onPress={()=>{router.push('/miscPage/faqPage')}} />
            <ProfileOption menu="Contact Us/Report a Problem" icon={<FontAwesome size={28} name="phone" color={'#656565'} />} onPress={() => Linking.openURL(`tel:${customerSupportPhone}`)} />
            <ProfileOption menu="Logout" icon={<FontAwesome size={24} name="sign-out" color={'#656565'} />} onPress={handleLogout} />
        </View>
    )
}