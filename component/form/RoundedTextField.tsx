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

export default RoundedTextField;