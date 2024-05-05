import { useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, Text } from "react-native";
import { getStationById, getUserChat } from "../datas/queries/useQueries";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";
import { useContext, useEffect, useState } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { FlatList } from "react-native-gesture-handler";
import RoundedTextField from "../../component/form/RoundedTextField";

export default function ChatPage() {

  const station_id = useLocalSearchParams().station
  const station = getStationById(station_id)

  const [messageInput, setMessageInput] = useState<string>("")

  const realm = useRealm()
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

  return (
    <ImageBackground
      source={require('../../assets/backgrounds/RegisterBG.png')}
      style={{ width: '100%', height: '100%' }}>

      <FlatList
        data={chat[0].message}
        renderItem={({ item }) => {
          return (
            <Text>{item.text}</Text>
          )
        }}
      >
      </FlatList>

      <RoundedTextField
        placeholder="Type a message"
        onChangeFunction={(text) => setMessageInput(text)}
        value={messageInput}
      />

      <Pressable onPress={handleAddMessage}>
        <Text>Send</Text>
      </Pressable>

    </ImageBackground>
  )
}