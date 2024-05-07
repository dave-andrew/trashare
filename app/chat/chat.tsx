import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { getStationById, getUserChat } from "../datas/queries/useQueries";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { FlatList } from "react-native-gesture-handler";
import RoundedTextField from "../../component/form/RoundedTextField";
import ChatBubble from 'react-native-chat-bubble';
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function ChatPage() {

  const realm = useRealm()
  const station_id = useLocalSearchParams().station
  const station = getStationById(realm, station_id)

  const [messageInput, setMessageInput] = useState<string>("")
  const flatListRef = useRef<FlatList>(null);

  const chat = getUserChat(station)
  console.log(chat)
  const { additionalInfo } = useContext(AdditionalInfoContext)

  const { createChat } = useChatMutation(realm, chat)
  const { addMessage } = useChatMutation(realm, chat)

  const handleAddMessage = () => {
    addMessage(chat[0], {
      text: messageInput,
      user: additionalInfo,
      type: "text"
    })
    setMessageInput("")
  }

  const chooseImage = () => {

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    }

    // choose image from device
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (!response.assets) {
        console.log('No image selected');
        return;
      }
      // Convert image from URI to BLOB
      const fetchResponse = await fetch(response.assets[0].uri);
      const theBlob = await fetchResponse.blob();
      // console.log("The Blob", theBlob);

      // upload image to firebase
      const imageRef = ref(storage, `chat-images/${additionalInfo?.uid}`);
      const uploadTask = uploadBytesResumable(imageRef, theBlob);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            addMessage(chat[0], {
              text: downloadURL,
              user: additionalInfo,
              type: "image"
            })
          });
        })
    })

  }

  useEffect(() => {
    if (chat.length === 0) {
      createChat({
        user: additionalInfo,
        station: station,
        messages: []
      })
    }
  }, [chat])

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chat]);

  return (
    <ImageBackground
      source={require('../../assets/backgrounds/RegisterBG.png')}
      style={{ width: '100%', height: '100%' }}>

      <FlatList
        ref={flatListRef}
        className="py-2 px-4"
        data={chat[0].message}
        renderItem={({ item }) => {
          return (
            <ChatBubble
              isOwnMessage={item.user._id === additionalInfo._id}
              bubbleColor="#8CE7FF"
              tailColor="#8CE7FF"
              withTail={true}
            >
              {
                item.type === "text" ?
                  <Text className="text-base">{item.text}</Text> :
                  <Image source={{ uri: item.text }} style={{ width: 200, height: 200 }} />
              }
            </ChatBubble>
          )
        }}
      >
      </FlatList>

      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={chooseImage}>
          <Text>Image</Text>
        </Pressable>

        <RoundedTextField
          placeholder="Type a message..."
          onChangeFunction={(text) => setMessageInput(text)}
          value={messageInput}
        />

        <Pressable onPress={handleAddMessage}>
          <Text>Send</Text>
        </Pressable>
      </View>

    </ImageBackground>
  )
}