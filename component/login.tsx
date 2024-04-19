import { useEmailPasswordAuth } from "@realm/react";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Button, Pressable, Text, TextInput, View } from "react-native";

interface Credential {
    email: string;
    password: string;
};

export default function Login({setEmail, setMode}: {setEmail: (email: string) => void, setMode: (mode: boolean) => void}) {

    const [loading, setLoading] = useState(false);
    const { logIn } = useEmailPasswordAuth();

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
        <View>
            <Text style={{ paddingTop: 16 }}>Login</Text>
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
                title="Login"
                onPress={handleLogin}
                disabled={loading || !credential.email || !credential.password}
            />

            <Text style={{ paddingTop: 16 }}>Don't have an account?<Button title="Click Here!" onPress={() => setMode(false)}/></Text>
        </View>
    )
}