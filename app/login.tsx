import { useEmailPasswordAuth } from "@realm/react";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {Alert, Button, Image, ImageBackground, Pressable, Text, TextInput, View} from "react-native";
import RoundedTextFIeld from "../component/form/RoundedTextField";

interface Credential {
    email: string;
    password: string;
};

export default function Login({setEmail, setMode}: {setEmail: (email: string) => void, setMode: (mode: boolean) => void}) {

    const [loading, setLoading] = useState(false);
    const { logIn } = useEmailPasswordAuth();
    const router = useRouter();

    const [credential, setCredential] = useState<Credential>({
        email: '',
        password: ''
    });

    const handleLogin = () => {
        try {
            setLoading(true);
            setEmail(credential.email);
            logIn({ email: credential.email, password: credential.password});
            
        } catch (error) {
            // Handle login error
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../assets/backgrounds/RegisterBG.png')}
                         style={{width: '100%', height: '100%'}}>
            <View className="p-6 flex justify-center place-items-center h-full w-full">
                <Image source={require('../assets/logo/trashare.png')} className={"mx-auto"}/>
                <View className="bg-white p-8 mt-4 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center mb-6">Login</Text>
                    <View className={""}>
                        <RoundedTextFIeld value={credential.email}
                                          placeholder={"Email"}
                                          onChangeFunction={(text) => setCredential({...credential, email: text})}
                        />
                    </View>
                    <RoundedTextFIeld value={credential.password}
                                      placeholder={"Password"}
                                      secureTextEntry={true}
                                      onChangeFunction={(text) => setCredential({...credential, password: text})}
                    />
                    <View className={"flex flex-row py-1 mx-auto"}>
                        <Text className={"text-gray-800 font-light text-xs"}>
                            Don't have an account?
                        </Text>
                        <Text
                            className={"text-blue-500 pl-1 underline text-xs"}
                            onPress={() => setMode(false)}>
                            Register here
                        </Text>
                    </View>

                    <Pressable
                        className={"rounded-2xl bg-sky-400 mt-4 mx-auto"}
                        onPress={handleLogin}
                        disabled={loading || !credential.email || !credential.password}>
                        <Text className={"text-white font-bold text-lg py-1 w-48 text-center"}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}