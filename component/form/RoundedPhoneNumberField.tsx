import { Text, TextInput, View } from "react-native";


const RoundedPhoneNumberField = ({ value, onChangeFunction, placeholder, secureTextEntry = false }) => {
    return (
        <View className="flex flex-row">
            <View>
                <Text className={"rounded-l-lg border border-r-0 border-gray-400 py-3 px-4 my-2"}>+62</Text>
            </View>
            <TextInput
                className={"rounded-r-lg border border-gray-400 py-2 px-4 flex-1 my-2"}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeFunction}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default RoundedPhoneNumberField;