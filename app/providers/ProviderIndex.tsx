import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm";
import { PaperProvider } from 'react-native-paper';
import { SYNC_CONFIG } from "../../sync.config";
import AuthPage from "../auth";
import { schemas } from "../../models/schemas";
import AdditionalInfoProvider from "./AdditionalInfoProvider";


export default function ProviderIndex({ children }: { children: React.ReactNode }) {
    return (
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
                            {children}
                        </AdditionalInfoProvider>
                    </RealmProvider>
                </UserProvider>
            </AppProvider>
        </PaperProvider>
    )
}