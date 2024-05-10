import React, { useState, useEffect, useContext, useRef } from "react";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatBubble from 'react-native-chat-bubble';
import { useQuery, useRealm } from "@realm/react";
import { router, useLocalSearchParams } from "expo-router";
import { useChatMutation } from "../datas/mutations/useMutations";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { getAdditionalInfo, getStationById, getStationChat, getUserChat } from "../datas/queries/useQueries";
import { ChatTextField } from "../../component/form/RoundedTextField";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { storage } from "../../firebaseConfig";
import { User } from "../../models/User";

export default function ChatPage() {
  const realm = useRealm();
  const station_id = useLocalSearchParams().station;
  const orderer_id = useLocalSearchParams().orderer;
  const userType = useLocalSearchParams().userType;
  const { additionalInfo } = useContext(AdditionalInfoContext);
  const flatListRef = useRef(null);

  const [messageInput, setMessageInput] = useState("");
  let station = null;
  let orderer = null;


  if (additionalInfo.station) {
    station = additionalInfo.station;
    orderer = getAdditionalInfo(realm, orderer_id)[0];

  } else {
    station = getStationById(realm, station_id);
    orderer = additionalInfo;
  }

  const chat = getUserChat(station, orderer);
  setTimeout(() => console.log("Chat:", chat), 500)

  console.log("Chat:", chat[0])

  const { createChat, addMessage } = useChatMutation(realm, chat);

  useEffect(() => {
    if (chat && chat.length === 0) {
      createChat({
        user: orderer,
        station: station,
        messages: []
      });
    }
  }, [realm, chat]);

  useEffect(() => {
    if (flatListRef.current && chat.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [chat]);

  const handleAddMessage = () => {
    if (messageInput === "") return;

    addMessage(chat[0], {
      text: messageInput,
      user: additionalInfo,
      type: "text"
    });
    setMessageInput("");
  };

  const handleBack = () => {
    router.back();
  };

  const handleCamera = () => {
    const params = {
      station: station._id,
      orderer: orderer._id,
    };

    router.push({ pathname: "chat/camera", params: params });
  };

  const chooseImage = (chat: any) => {

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
  
  const users = useQuery(User)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(users)
        })
    }, [realm, chat])

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
        {
          chat.length > 0 && (
            <Text className="text-lg text-center font-medium ml-6 mb-3">{chat[0]?.station?.name}</Text>
          )
        }
      </View>

      {chat && chat.length > 0 && (
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            className="py-2 px-4"
            data={chat[0]?.message}
            renderItem={({ item }) => {
              
              return (
                <ChatBubble
                  isOwnMessage={item.user._id === additionalInfo._id}
                  bubbleColor={(item.user._id === additionalInfo._id) ? "#8CE7FF" : "#FFFFFF"}
                  tailColor={(item.user._id === additionalInfo._id) ? "#8CE7FF" : "#FFFFFF"}
                  withTail={true}
                >
                  {
                    item.type === "text" ?
                      <Text className="text-base">{item.text}</Text> :
                      <Image source={{ uri: item.text }} style={{ width: 200, height: 200, borderRadius: 20 }} />
                  }
                </ChatBubble>
              );
            }}
          />
          <View
            style={{ flexDirection: 'row', elevation: 10 }}
            className="bg-white w-full justify-around items-center"
          >
            <Pressable onPress={handleCamera} className="ml-3">
              <Image source={require('../../assets/photo-camera.png')} style={{ width: 25, height: 25 }} />
            </Pressable>

            <Pressable onPress={() => chooseImage(chat)} className="ml-3">
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
  );
}
