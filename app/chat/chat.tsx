import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { getStationById, getUserChat } from "../datas/queries/useQueries";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { FlatList } from "react-native-gesture-handler";
import RoundedTextField, { ChatTextField } from "../../component/form/RoundedTextField";
import ChatBubble from 'react-native-chat-bubble';
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane'
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage'

export default function ChatPage() {

  const realm = useRealm()
  const station_id = useLocalSearchParams().station
  const station = getStationById(realm, station_id)

  if (!station) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const [messageInput, setMessageInput] = useState<string>("")
  const flatListRef = useRef<FlatList>(null);

  const chat = getUserChat(station)
  
  console.log(chat)
  const { additionalInfo } = useContext(AdditionalInfoContext)
  console.log(additionalInfo)

  const { createChat } = useChatMutation(realm, chat)
  const { addMessage } = useChatMutation(realm, chat)

  const handleAddMessage = () => {
    if (messageInput === "") return

    addMessage(chat[0], {
      text: messageInput,
      user: additionalInfo,
      type: "text"
    })
    setMessageInput("")
  }

  const handleBack = () => {
    router.back()
  }

  const handleCamera = () => {

    const params = {
      station: station_id
    }

    router.push({ pathname: "chat/camera", params: params })
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
      const imageRef = ref(storage, `chat-images/${additionalInfo?.uid}+${new Date().getTime()}.jpg`);
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
    if (flatListRef.current && chat.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [chat, flatListRef.current]);

  return (
    <ImageBackground
      source={require('../../assets/backgrounds/RegisterBG.png')}
      style={{ width: '100%', height: '100%' }}>

      <View
        className='w-[102%] h-[13vh] bg-white items-end'
        style={{ flexDirection: 'row' }}
      >
        <Pressable onPress={handleBack} className="ml-4 mb-4">
          <Image source={require('../../assets/arrow.png')} style={{ width: 20, height: 20 }} />
        </Pressable>
        <Text className="text-lg text-center font-medium ml-6 mb-3">{station.name}</Text>
      </View>

      {(chat.length > 0 && additionalInfo) && (
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            className="mb-2 px-4"
            data={chat[0].message}
            renderItem={({ item }) => {
              return (
                <ChatBubble
                  isOwnMessage={item.user._id === additionalInfo?._id}
                  bubbleColor="#8CE7FF"
                  tailColor="#8CE7FF"
                  withTail={true}
                >
                  {
                    item.type === "text" ?
                      <Text className="text-base">{item.text}</Text> :
                      <Image source={{ uri: item.text }} style={{
                        width: 200,
                        height: 200,
                        borderRadius: 16
                      }} />
                  }
                </ChatBubble>
              )
            }}
          >
          </FlatList>
          <View
            style={{ flexDirection: 'row', elevation: 10 }}
            className="bg-white w-full justify-around items-center"
          >
            <Pressable onPress={handleCamera} className="ml-3">
              <Image source={require('../../assets/photo-camera.png')} style={{ width: 25, height: 25 }} />
            </Pressable>

            <Pressable onPress={chooseImage} className="ml-3">
              <Image source={require('../../assets/insert-picture-icon.png')} style={{ width: 25, height: 25 }} />
            </Pressable>

            <ChatTextField
              placeholder="Type a message..."
              onChangeFunction={(text) => setMessageInput(text)}
              value={messageInput}
              onSubmitEditing={handleAddMessage}
            />

            <Pressable onPress={handleAddMessage} className="rounded-full p-3 mr-3" style={{ backgroundColor: "#00B1F7" }}>
              <Image source={require('../../assets/send-message.png')} style={{ width: 15, height: 15 }} />
            </Pressable>
          </View>
        </View>
      )}

    </ImageBackground>
  )
}