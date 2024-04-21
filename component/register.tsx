import {useEmailPasswordAuth} from "@realm/react";
import {useState} from "react";
import {Text, View, TextInput, Button, Alert, ImageBackground, Image, Touchable, Pressable} from "react-native";
import {User} from "../models/User";
import {router} from "expo-router";
import RoundedTextFIeld from "./form/RoundedTextField";


interface Credential {
    fullName: string;
    email: string;
    password: string;
    phone: string;
}

export default function Register({setEmail, setMode}: {
    setEmail: (email: string) => void,
    setMode: (mode: boolean) => void
}) {
    const {register} = useEmailPasswordAuth();
    const [credential, setCredential] = useState<Credential>({
        fullName: '',
        email: '',
        password: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        try {
            setLoading(true);
            register({email: credential.email, password: credential.password});

            setEmail(credential.email);

        } catch (error) {
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
                        className="text-xl font-bold text-center mb-6">Create an Account</Text>
                    <View className={""}>
                        <RoundedTextFIeld value={credential.fullName}
                                          placeholder={"Full Name"}
                                          onChangeFunction={(text) => setCredential({...credential, fullName: text})}
                        />
                        <RoundedTextFIeld value={credential.email}
                                          placeholder={"Email"}
                                          onChangeFunction={(text) => setCredential({...credential, email: text})}
                        />
                        <RoundedTextFIeld value={credential.phone}
                                          placeholder={"Phone Number"}
                                          onChangeFunction={(text) => setCredential({...credential, phone: text})}
                        />
                        <RoundedTextFIeld value={credential.password}
                                          placeholder={"Password"}
                                          onChangeFunction={(text) => setCredential({...credential, phone: text})}
                        />
                        <RoundedTextFIeld value={credential.password}
                                          placeholder={"Confirm Password"}
                                          onChangeFunction={(text) => setCredential({...credential, phone: text})}
                        />
                        <View className={"flex flex-row py-1 mx-auto"}>
                            <Text className={"text-gray-800 font-light text-xs"}>
                                Already have an account?
                            </Text>
                            <Text
                                className={"text-blue-500 pl-1 underline text-xs"}
                                onPress={() => setMode(true)}>
                                Login here
                            </Text>
                        </View>

                        <Pressable
                            className={"rounded-2xl bg-sky-400 mt-4 mx-auto"}
                            onPress={handleRegister}
                            disabled={loading || !credential.email || !credential.password}>
                            <Text className={"text-white font-bold text-lg py-1 px-12"}>
                                Register
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
