import { Button, Text, View } from "react-native";
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
            <Text>Profile</Text>

            <Button title="Logout" onPress={handleLogout} />

            <EditScreenInfo path="app/(tabs)/profile.tsx" />
        </View>
        
    );
}