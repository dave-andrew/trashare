import { Button, Text, View } from "react-native";
import { Camera, Templates, useCameraDevice, useCameraFormat, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
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
        console.log(data)
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={camera}
                device={device}
                isActive={true}
                className="flex-1 absolute top-0 left-0 w-full h-full"
                photo={true}
            />

            <Button title={"Photo"} onPress={handlePhoto}></Button>
        </View>
    );
}
