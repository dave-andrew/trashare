import { Text } from "react-native";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import LoginPage from "./login";
import { AppSync } from "../component/AppSync";
import { Task } from "../models/Task";
import { SYNC_CONFIG } from "../sync.config";
import { ScreenStack } from "react-native-screens";
import { Slot, Stack } from "expo-router";
import { NavigatorProps } from "expo-router/build/views/Navigator";

export default function AppLayout() {
    return (
        <AppProvider id={SYNC_CONFIG.appId}>
            <UserProvider fallback={LoginPage}>
                <RealmProvider
                    schema={schemas}
                    sync={{
                        flexible: true,
                    }}
                >
                    <Stack>
                        {/* <Stack.Screen name="login" options={{headerShown: false}} />
                        <Stack.Screen name="register" /> */}
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    );
}
