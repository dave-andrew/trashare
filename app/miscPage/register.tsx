import { useEmailPasswordAuth, AuthOperationName } from "@realm/react";
import { useEffect, useRef, useState } from "react";
import { Text, View, Alert, ImageBackground, Image, Touchable, Pressable } from "react-native";
import RoundedTextFIeld from "../../component/form/RoundedTextField";


export default function Register({ setMode }: {
    setMode: (mode: boolean) => void,
}) {
    const { register } = useEmailPasswordAuth();

    const [loading, setLoading] = useState(false);

    const [credentialInput, setCredentialInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { logIn, result } = useEmailPasswordAuth();
    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }

        if (result.success && result.operation == AuthOperationName.Register) {
            console.log(result);

            if (credentialInput.email != '' && credentialInput.password != '') {
                logIn({ email: credentialInput.email, password: credentialInput.password });
            }
        } else {
            if (result.error) {
                Alert.alert('Error', result.error.message);
            }
            return;
        }
    }, [result]);

    const handleRegister = async () => {
        try {
            if (!loading) {
                setLoading(true);

                if (credentialInput.password !== credentialInput.confirmPassword) {
                    Alert.alert('Error', 'Password does not match.');
                    return;
                }

                if(credentialInput.email == '' || credentialInput.password == '' || credentialInput.confirmPassword == '') {
                    Alert.alert('Error', 'Please fill in all fields.');
                    return;
                }

                if(!credentialInput.email.endsWith('@trashare.com')) {
                    Alert.alert('Error', 'Email must ends with @trashare.com');
                    return;
                }
                register({ email: credentialInput.email, password: credentialInput.password });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to register.' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../../assets/backgrounds/RegisterBG.png')}
            style={{ width: '100%', height: '100%' }}>
            <View className="p-6 flex justify-center place-items-center h-full w-full">
                <Image source={require('../../assets/logo/trashare.png')} className={"mx-auto"} />
                <View className="bg-white p-8 mt-4 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center mb-6">Create an Account</Text>
                    <View className={""}>
                        <RoundedTextFIeld value={credentialInput.email}
                            placeholder={"Email"}
                            onChangeFunction={(text) => setCredentialInput({ ...credentialInput, email: text })}
                        />
                        <RoundedTextFIeld value={credentialInput.password}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeFunction={(text) => setCredentialInput({ ...credentialInput, password: text })}
                        />
                        <RoundedTextFIeld value={credentialInput.confirmPassword}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                            onChangeFunction={(text) => setCredentialInput({ ...credentialInput, confirmPassword: text })}
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
                            disabled={loading}>
                            <Text className={"text-white font-bold text-lg py-1 w-48 text-center"}>
                                Register
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
