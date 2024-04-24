import { Button, Text, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
import { useEffect, useRef, useState } from "react"; // Import useState for loading state

export default function CameraPage() {
    const device = useCameraDevice('back');

    const camera = useRef<Camera>(null);

    if (!device) {
        return <Text>No camera device detected!</Text>;
    }

    const handlePhoto = async () => {
        const photo = await camera.current?.takePhoto();
        const result = await fetch(`file://${photo.path}`)
        const data = await result.blob()
    }

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        if (frame.pixelFormat === 'rgb') {
            const buffer = frame.toArrayBuffer()
            const data = new Uint8Array(buffer)
            console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={camera}
                device={device}
                isActive={true}
                style={{ flex: 1 }}
                photo={true}
                frameProcessor={frameProcessor}
            />

            <Button title={"Photo"} onPress={handlePhoto}></Button>
        </View>
    );
}
