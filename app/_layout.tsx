import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProviderIndex from "./providers/ProviderIndex";

export default function AppLayout() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ProviderIndex>
                <Stack screenOptions={{ contentStyle: { backgroundColor: '#f9f9f9' } }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="miscPage/faqPage" options={{
                        title: "Frequently Asked Question",
                        headerStyle: { backgroundColor: '#f9f9f9' },
                        headerTintColor: '#000',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                    <Stack.Screen name="finish/finishPage"
                        options={{
                            title: "Finish Order",
                            // headerShown: false,
                        }}
                    />
                    <Stack.Screen name="history/detail"
                        options={{
                            title: "Order Details",
                            headerStyle: { backgroundColor: '#fff'},
                            headerTintColor: '#000',
                            headerTitleStyle: {
                                fontWeight: 'bold'
                            },
                        }}
                    />
                    <Stack.Screen name="queue/detail"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="chat/chat"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="chat/camera"
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>

            </ProviderIndex>
        </GestureHandlerRootView>
    );
}
