import { storage } from "../../firebaseConfig";
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";

export const chooseImage = (chat: any) => {

    const realm = useRealm();

    const { additionalInfo } = useContext(AdditionalInfoContext);
    const { createChat, addMessage } = useChatMutation(realm, chat);

    const options: ImageLibraryOptions = {
        mediaType: "photo",
        quality: 1,
    };

    launchImageLibrary(options, async (response) => {
        if (response.didCancel || !response.assets) {
            console.log("User cancelled image picker or no image selected");
            return;
        }

        const fetchResponse = await fetch(response.assets[0].uri);
        const theBlob = await fetchResponse.blob();

        const imageRef = ref(storage, `chat-images/${additionalInfo?.uid}+${new Date().getTime()}.jpg`);
        const uploadTask = uploadBytesResumable(imageRef, theBlob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addMessage(chat[0], {
                        text: downloadURL,
                        user: additionalInfo,
                        type: "image",
                    });
                });
            }
        );
    });
};