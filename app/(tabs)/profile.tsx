import { Button, Image, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useEmailPasswordAuth } from "@realm/react";
import { useRouter } from "expo-router";

export default function Profile() {

    const { logOut } = useEmailPasswordAuth();

    const router = useRouter();

    const handleLogout = () => {
        logOut()
        router.push('/auth')
    }

    return (
        <View>
            <Image
                className='absolute w-full h-[22vh] rounded-b-2xl mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
            />
            <Text>Profile</Text>

            <Button title="Logout" onPress={handleLogout} />

            <EditScreenInfo path="app/(tabs)/profile.tsx" />
        </View>

    );
}