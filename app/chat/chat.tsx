import { useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { getStationById, getUserChat } from "../datas/queries/useQueries";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { FlatList } from "react-native-gesture-handler";
import RoundedTextField from "../../component/form/RoundedTextField";
import ChatBubble from 'react-native-chat-bubble';

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
      user: additionalInfo
    })
    setMessageInput("")
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
          return(
            <ChatBubble
              isOwnMessage={item.user._id === additionalInfo._id}
              bubbleColor="#8CE7FF"
              tailColor="#8CE7FF"
              withTail={true}
            >
              <Text className="text-base">{item.text}</Text>
            </ChatBubble>
          )
        }}
      >
      </FlatList>

      <RoundedTextField
        placeholder="Type a message..."
        onChangeFunction={(text) => setMessageInput(text)}
        value={messageInput}
      />

      <Pressable onPress={handleAddMessage}>
        <Text>Send</Text>
      </Pressable>

    </ImageBackground>
  )
}