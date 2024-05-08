import React, { useState, useEffect, useContext, useRef } from "react";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatBubble from 'react-native-chat-bubble';
import { useRealm } from "@realm/react";
import { router, useLocalSearchParams } from "expo-router";
import { useChatMutation } from "../datas/mutations/useMutations";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { getAdditionalInfo, getStationById, getStationChat, getUserChat } from "../datas/queries/useQueries";
import RoundedTextField, { ChatTextField } from "../../component/form/RoundedTextField";
import { chooseImage } from "./chatFunction";

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

  if(additionalInfo.station) {
    station = additionalInfo.station;
  } else {
    station = getStationById(realm, station_id);
  }

  if(orderer_id) {
    orderer = getAdditionalInfo(realm, orderer_id);
  } else {
    orderer = additionalInfo;
  }
  
  const chat = getUserChat(station, orderer);
  
  console.log("Chat:", chat)

  const { createChat, addMessage } = useChatMutation(realm, chat);

  useEffect(() => {
    if (chat.length === 0) {
      createChat({
        user: additionalInfo,
        station: station_id,
        messages: []
      });
    }
  }, [chat, createChat, additionalInfo, station_id]);

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
      station: station_id
    };

    router.push({ pathname: "chat/camera", params: params });
  };

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
        <Text className="text-lg text-center font-medium ml-6 mb-3">{chat[0]?.station?.name}</Text>
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
