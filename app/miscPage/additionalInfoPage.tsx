import { Dispatch, useContext, useState } from "react";
import { useRealm } from "@realm/react";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import RoundedTextField from "../../component/form/RoundedTextField";
import RoundedRadioButton from "../../component/form/RoundedRadioButton";
import { useMutationAdditionalInfo } from "../datas/mutations/useAdditionalInfo";
import RoundedPhoneNumberField from "../../component/form/RoundedPhoneNumberField";

export default function AdditionalInfoPage({ user_id, setStateContext }: { user_id: string, setStateContext: Dispatch<any>}) {

    const realm = useRealm()
    const [additionalInfoInput, setAdditionalInfoInput] = useState({
        username: '',
        gender: '',
        phone: '',
    })
    const [loading, setLoading] = useState(false)

    const { registerAdditionalInfo } = useMutationAdditionalInfo()
    const handleRegister = () => {
        if (!loading) {
            setLoading(true)
            registerAdditionalInfo({
                realm: realm,
                user_id: user_id,
                username: additionalInfoInput.username,
                phone: additionalInfoInput.phone,
                gender: additionalInfoInput.gender,
                setStateContext: setStateContext
            })
        }
    }

    return (
        <ImageBackground source={require('../../assets/backgrounds/RegisterBG.png')}
            style={{ width: '100%', height: '100%' }}>
            <View className="p-6 flex justify-center place-items-center h-full w-full">
                <Image source={require('../../assets/logo/trashare.png')} className={"mx-auto"} />
                <View className="bg-white p-8 mt-4 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center mb-6">Let us get to know{"\n"}you better! 👋</Text>
                    <RoundedTextField value={additionalInfoInput.username}
                        placeholder={"Full Name"}
                        onChangeFunction={(text) => setAdditionalInfoInput({ ...additionalInfoInput, username: text })}
                    />

                    <RoundedPhoneNumberField value={additionalInfoInput.phone}
                        placeholder={"Phone Number"}
                        onChangeFunction={(text) => setAdditionalInfoInput({ ...additionalInfoInput, phone: text })}
                    />
                    <View className={"flex flex-row mb-6"}>
                        <RoundedRadioButton
                            label="Male"
                            customClass="mr-1"
                            value="Male"
                            selected={additionalInfoInput.gender == "Male"}
                            onTouchFunction={() => setAdditionalInfoInput({ ...additionalInfoInput, gender: "Male" })} />
                        <RoundedRadioButton
                            label="Female"
                            customClass="ml-1"
                            value="Female"
                            selected={additionalInfoInput.gender == "Female"}
                            onTouchFunction={() => setAdditionalInfoInput({ ...additionalInfoInput, gender: "Female" })} />
                    </View>

                    <Pressable
                        className={"rounded-2xl bg-sky-400 mt-4 mx-auto"}
                        onPress={handleRegister}
                        disabled={loading || !additionalInfoInput.phone || !additionalInfoInput.username || !additionalInfoInput.gender}>
                        <Text className={"text-white font-bold text-lg py-1 w-48 text-center"}>
                            Submit !
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}