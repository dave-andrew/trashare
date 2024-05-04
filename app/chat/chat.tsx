import { useLocalSearchParams } from "expo-router";
import { ImageBackground, Text } from "react-native";
import { getStationById, getUserChat } from "../datas/queries/useQueries";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";
import { useContext, useEffect } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";

export default function ChatPage() {

  const station_id = useLocalSearchParams().station
  const station = getStationById(station_id)

  const realm = useRealm()
  const chat = getUserChat(station)
  const { additionalInfo } = useContext(AdditionalInfoContext)

  const { createChat } = useChatMutation(realm, chat)

  useEffect(() => {
    if (!chat) {
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

    </ImageBackground>
  )
}