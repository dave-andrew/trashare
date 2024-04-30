import { Button, Image, ImageBackground, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useEmailPasswordAuth } from "@realm/react";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import UserInfoDashboard from "../../component/profile/UserInfoDashboard";

export default function Profile() {

    const { logOut } = useEmailPasswordAuth();

    const router = useRouter();

    const handleLogout = () => {
        logOut()
        router.push('/auth')
    }

    const userAdditionalInfo = useContext(AdditionalInfoContext);
    return (
        <View className="h-full bg-white">
            <ImageBackground
                className='w-full h-[28vh] mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
                imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                {userAdditionalInfo &&
                    <Text className="text-lg text-center color-white mt-14">Profile</Text>
                }
            </ImageBackground>
            <UserInfoDashboard userAdditionalInfo={userAdditionalInfo} />

            <Button title="Logout" onPress={handleLogout} />

            <EditScreenInfo path="app/(tabs)/profile.tsx" />
        </View>

    );
}