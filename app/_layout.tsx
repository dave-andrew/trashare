import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { schemas } from "../models/schemas";
import AuthPage from "../component/auth";
import { SYNC_CONFIG } from "../sync.config";
import { Stack } from "expo-router";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";

export default function AppLayout() {
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
