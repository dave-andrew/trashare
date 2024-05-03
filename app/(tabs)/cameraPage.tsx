import { Image, Pressable, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { fetchResult } from "../../trashareAiConfig";

export default function CameraPage() {

    const camera = useRef<Camera>(null);
    const type = CameraType.back;

    const [device, setDevice] = useState<CameraType | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === "granted") {
                setDevice(type);
            }
        })();
    }, []);

    if (!device) {
        return <Text>No camera device detected!</Text>;
    }

    const handlePhoto = async () => {
        const photo = await camera.current?.takePictureAsync();
        const result = await fetch(`file://${photo?.uri}`)
        const data = await result.blob()

        // TODO: Save photo + pake API Deep Learningnya
        
        const classification = fetchResult(data)
        console.log(classification)
    }

    return (
        <View style={{ flex: 1 }}>
            <View
                className='w-full h-[11vh] rounded-max mx-auto bg-white z-10 rounded-b-2xl'
            >
                <View className="mt-[6vh] justify-center items-center ml-4">
                    <Text className="text-lg font-medium">Scan</Text>
                </View>
            </View>
            <Camera
                ref={camera}
                type={device}
                className="flex-1 absolute top-0 left-0 w-full h-full"
            />

            <Pressable 
                onPress={handlePhoto}
                className="absolute bottom-8 left-0 right-0 flex items-center justify-center h-15"
                >
                <Image
                    source={require("../../assets/capture.png")}
                    className="w-16 h-16"
                    style={{tintColor: 'white'}} />
            </Pressable>
        </View>
    );
}
