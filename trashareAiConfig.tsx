export const url = "http://154.41.254.221:8000/predict";

export const fetchResult = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
