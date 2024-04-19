import { useEmailPasswordAuth, useRealm } from "@realm/react";
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

export default function LoginPage() {
    const { register } = useEmailPasswordAuth();
    const [credential, setCredential] = useState<Credential>({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);
    const realm = useRealm();

    const handleRegister = () => {
        try {
            setLoading(true);
            register({ email: credential.email, password: credential.password});
            
            const user = new User(realm, {email: credential.email, username: credential.username, phone: credential.phone});

            realm.write(() => {
                realm.create('User', user);
            });

            router.push('/login');
            
        } catch (error) {
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ paddingTop: 16 }}>Register</Text>
            <Text style={{ paddingTop: 16 }}>Username</Text>
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
            
        </View>
    );
}
