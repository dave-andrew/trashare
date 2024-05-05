import axios from 'react-native-axios';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from './firebaseConfig';

export const url = "http://154.41.254.221:8000/predict";
export const baseUrl = "http://154.41.254.221:8000/";

export const checkConnection = async () => {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error checking connection:', error);
    }
};

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
                console.log('Upload is done');
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                    const response = await axios.post(url, { url: downloadURL });
                    console.log('Response: ', response.data);
                    resolve({'response': response.data, downloadURL});
                } catch (error) {
                    console.error('Error fetching result:', error.message);
                    reject(error);
                } finally {
                    // Clean up the upload task
                    uploadTask.cancel();
                }
            }
        );
    });
};
