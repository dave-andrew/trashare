import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProviderIndex from "./providers/ProviderIndex";

export default function AppLayout() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ProviderIndex>
                <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="miscPage/faqPage" options={{
                        title: "Frequently Asked Question",
                        headerStyle: { backgroundColor: '#fff' },
                        headerTintColor: '#000',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                    <Stack.Screen name="finish/finishPage"
                        options={{
                            // headerShown: false,
                        }}
                    />
                </Stack>

            </ProviderIndex>
        </GestureHandlerRootView>
    );
}
