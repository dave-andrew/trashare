import {useEffect, useState} from "react";
import {AuthOperationName, useEmailPasswordAuth} from "@realm/react";
import {View} from "react-native";
import Login from "./login";
import Register from "./register";

export interface Credential {
    email: string;
    password: string;
};

export default function AuthPage() {

    const [mode, setMode] = useState<boolean>(true);




    return (
        <View>

            {
                mode ? <Login setMode={setMode}/> :
                    <Register setMode={setMode}/>
            }

        </View>
    );
}
