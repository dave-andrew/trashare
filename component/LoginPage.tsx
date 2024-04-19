import { useEmailPasswordAuth } from "@realm/react";
import { useNavigation } from "expo-router";
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
    const navigation = useNavigation();

    const handleLogin = () => {
        try {
            setLoading(true);
            logIn({ email: credential.email, password: credential.password});
            // Login successful, you can navigate to the next screen
            // navigation.navigate('Home');
        } catch (error) {
            // Handle login error
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

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

            <Text style={{ paddingTop: 16 }}>Don't have an account?<Pressable>Click Here!</Pressable></Text>
            
        </View>
    );
}
