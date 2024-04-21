import { useEmailPasswordAuth } from "@realm/react";
import { useState } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { User } from "../models/User";
import { router } from "expo-router";


interface Credential {
    username: string;
    email: string;
    password: string;
    phone: string;
}

export default function Register({setEmail, setMode}: {setEmail: (email: string) => void, setMode: (mode: boolean) => void}) {
    const { register } = useEmailPasswordAuth();
    const [credential, setCredential] = useState<Credential>({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        try {
            setLoading(true);
            register({ email: credential.email, password: credential.password});

            setEmail(credential.email);
            
        } catch (error) {
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Text
                className="text-xl font-bold text-center"
                style={{ paddingTop: 16 }}>Create an Account</Text>
            <Text
                className="text-center text-lg"
                style={{ paddingTop: 16, paddingBottom: 12 }}>Username</Text>
            <TextInput
                style={{ paddingTop: 16, paddingBottom: 8, borderWidth: 1, borderColor: 'black' }}
                value={credential.email}
                onChangeText={(text) => setCredential({ ...credential, email: text })}
            />
            <Text style={{ paddingTop: 16 }}>Email</Text>
            <TextInput
                style={{ paddingTop: 16, paddingBottom: 8, borderWidth: 1, borderColor: 'black' }}
                value={credential.email}
                onChangeText={(text) => setCredential({ ...credential, email: text })}
            />
            <Text style={{ paddingTop: 16 }}>Password</Text>
            <TextInput
                style={{ paddingTop: 16, paddingBottom: 8, borderWidth: 1, borderColor: 'black' }}
                secureTextEntry
                value={credential.password}
                onChangeText={(text) => setCredential({ ...credential, password: text })}
            />
            <Button
                title="Register"
                onPress={handleRegister}
                disabled={loading || !credential.email || !credential.password}
            />
            <Text style={{ paddingTop: 16 }}>Already have an account?<Button title="Click Here!" onPress={() => setMode(true)}/></Text>
            
        </View>
    );
}
