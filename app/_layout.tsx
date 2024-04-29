import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import { SYNC_CONFIG } from "../sync.config";
import { Stack } from "expo-router";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";
import AuthPage from "./auth";
import AdditionalInfoProvider from "../providers/AdditionalInfoProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from 'react-native-paper';

export default function AppLayout() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <AppProvider id={SYNC_CONFIG.appId}>
                    <UserProvider fallback={AuthPage}>
                        <RealmProvider
                            schema={schemas}
                            sync={{
                                flexible: true,
                                existingRealmFileBehavior: {
                                    type: OpenRealmBehaviorType.DownloadBeforeOpen,
                                    timeOut: 1000,
                                    timeOutBehavior:
                                        // Cast 'openLocalRealm' to OpenRealmTimeOutBehavior
                                        'openLocalRealm' as OpenRealmTimeOutBehavior,
                                },
                            }}
                        >
                            <AdditionalInfoProvider>
                                <Stack>
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                </Stack>
                            </AdditionalInfoProvider>
                        </RealmProvider>
                    </UserProvider>
                </AppProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
