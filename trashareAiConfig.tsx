export const url = "http://154.41.254.221:8000/predict";

export const baseUrl = "http://154.41.254.221:8000/";

export const checkConnection = async () => {
    const response = await fetch(baseUrl);
    response.json().then((data) => {
        console.log(data);
    })
};

export const fetchResult = async (blob: Blob) => {
    // send the image to the server using base64
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            base64_string: reader.result
        })
    };

    const response = await fetch(url, data);

    return response.json().then((data) => {
        console.log(data);
        return data;
    });
};
