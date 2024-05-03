import axios from 'react-native-axios';

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

export const fetchResult = async (blob: Blob) => {
    // turn blob into file then fetch the api
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error fetching result:', error);
    }
};
