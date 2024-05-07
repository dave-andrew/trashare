import {TextInput} from "react-native";


const RoundedTextField = ({value, onChangeFunction, placeholder, secureTextEntry= false}) => {
    return (
        <TextInput
            className={"rounded-lg border border-gray-400 py-2 px-4 w-full my-2"}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeFunction}
            secureTextEntry={secureTextEntry}
        />
    )
}

export const ChatTextField = ({value, onChangeFunction, placeholder, secureTextEntry= false, onSubmitEditing}) => {
    return (
        <TextInput
            className={"rounded-full border border-gray-400 flex-1 py-1 px-4 my-2 mx-4 text-sm"}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeFunction}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
        />
    )
}


export default RoundedTextField;