import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import { SYNC_CONFIG } from "../sync.config";
import { Stack } from "expo-router";
import Realm from "realm";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";
import AuthPage from "./auth";
import { useCameraPermission } from "react-native-vision-camera";
import { useEffect, useRef } from "react";
import AdditionalInfoProvider from "../providers/AdditionalInfoProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
        </GestureHandlerRootView>
    );
}
