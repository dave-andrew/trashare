import { Text } from "react-native";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import LoginPage from "../component/LoginPage";
import { AppSync } from "../component/AppSync";
import { Task } from "../models/Task";
import { SYNC_CONFIG } from "../sync.config";
import { ScreenStack } from "react-native-screens";
import { Stack } from "expo-router";

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
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    );
}
