import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import { SYNC_CONFIG } from "../sync.config";
import { Stack } from "expo-router";
import Realm from "realm";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";
import AuthPage from "./auth";
import {useCameraPermission} from "react-native-vision-camera";
import {useEffect, useRef} from "react";

export default function AppLayout() {

    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if (!hasPermission) {
            console.log("Requesting camera permission...");
            requestPermission();
        }
    }, [hasPermission, requestPermission]);


    return (
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
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    );
}
