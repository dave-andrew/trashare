import { useEmailPasswordAuth } from "@realm/react";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useState } from "react";
import { Text, View, TextInput, Button, Alert, Pressable } from "react-native";

interface Credential {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { logIn } = useEmailPasswordAuth();
    const [credential, setCredential] = useState<Credential>({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        try {
            setLoading(true);
            logIn({ email: credential.email, password: credential.password});
        } catch (error) {
            // Handle login error
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const rootNavigationState = useRootNavigationState();
    console.log(rootNavigationState);

    // if(!rootNavigationState?.key) return null; 

    return (
        <View style={{ padding: 16 }}>
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

            <Text style={{ paddingTop: 16 }}>Don't have an account?<Link href={"/register"}>Click Here!</Link></Text>
            
        </View>
    );
}
