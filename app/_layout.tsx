import { Text } from "react-native";
import { Stack } from "expo-router";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import LoginPage from "../component/LoginPage";
import { AppSync } from "../component/AppSync";
import { Task } from "../models/Task";
import { SYNC_CONFIG } from "../sync.config";

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
                    <AppSync />
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    );
}
