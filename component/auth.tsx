import { useState } from "react";
import { Text, View, TextInput, Button, Alert, Pressable } from "react-native";
import Login from "./login";
import Register from "./register";

export default function AuthPage() {
    
    const [email, setEmail] = useState('');

    const [mode, setMode] = useState<boolean>(true);

    return (
        <View>
            
            {
                mode ? <Login setEmail={setEmail} setMode={setMode} /> : <Register setEmail={setEmail} setMode={setMode} />
            }
            
        </View>
    );
}
