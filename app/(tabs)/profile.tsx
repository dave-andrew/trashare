import { Button, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useEmailPasswordAuth } from "@realm/react";

export default function Profile() {

    const { logOut } = useEmailPasswordAuth();

    return (
        <View>
            <Text>Profile</Text>

            <Button title="Logout" onPress={logOut} />

            <EditScreenInfo path="app/(tabs)/profile.tsx" />
        </View>
        
    );
}