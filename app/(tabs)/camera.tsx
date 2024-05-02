import { Image, Pressable, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { useEffect, useRef } from "react"; // Import useState for loading state

export default function CameraPage() {

    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if (!hasPermission) {
            console.log("Requesting camera permission...");
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    const device = useCameraDevice('back');

    const camera = useRef<Camera>(null);

    if (!device) {
        return <Text>No camera device detected!</Text>;
    }

    const handlePhoto = async () => {
        const photo = await camera.current?.takePhoto();
        const result = await fetch(`file://${photo.path}`)
        const data = await result.blob()

        // TODO: Save photo + pake API Deep Learningnya
        // console.log(data)
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
                device={device}
                isActive={true}
                className="flex-1 absolute top-0 left-0 w-full h-full"
                photo={true}
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
