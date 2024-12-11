import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from './firebaseConfig';
import { Alert } from "react-native";

export const url = "https://trashare.vncnttan.my.id/predict";

export const fetchResult = (blob: Blob) => {
    return new Promise(async (resolve, reject) => {
        const imageRef = ref(storage, `images/ai_request.jpg`);
        const uploadTask = uploadBytesResumable(imageRef, blob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Error uploading image: ", error);
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ url: downloadURL })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch result');
                    }

                    const responseData = await response.json();
                    resolve({ response: responseData, downloadURL });
                } catch (error) {
                    Alert.alert("Result", error.message);
                    reject(error);
                } finally {
                    // Clean up the upload task
                    uploadTask.cancel();
                }
            }
        );
    });
};
