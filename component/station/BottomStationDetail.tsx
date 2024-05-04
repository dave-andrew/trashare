import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import { History } from "../../models/History"
import { Station } from "../../models/Station"
import { Results } from "realm"
import { Linking } from 'react-native';
import BottomButtons from "./BottomButtons";
import { useRouter } from "expo-router";

export default function BottomStationDetail({ station, getQueue, handleQueue, deleteQueue }: { station: Station, getQueue: Results<History>, handleQueue: (method: string) => void, deleteQueue: (queue: any) => void }) {

  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (station) {
      if (parseInt(station?.openingHours.open) < new Date().getHours() && parseInt(station?.openingHours.close) > new Date().getHours()) {
        setIsOpen(true)
        return
      }
      setIsOpen(false)
    }
  }, [])

  return (
    <BottomSheet
      style={{ elevation: 5, paddingHorizontal: 12, gap: 10 }}
      snapPoints={['40%', '40%']}
      enablePanDownToClose={getQueue.length == 0 ? true : false}
      handleIndicatorStyle={{ backgroundColor: '#eee', width: 60, height: 6 }}>

      <Text className='text-center text-lg font-bold '>{station?.name}</Text>
      <View className='flex flex-row justify-between my-4'>
        <Image
          style={{ borderRadius: 10 }}
          className='w-[38%] h-28'
          source={{
            uri: station?.imageUrl,
          }}
        />
        <View className="w-[58%] flex">
          <View className="flex flex-row gap-1">
            <Text className={`font-bold ${isOpen ? "text-green-500" : "text-red-500"}`}>{isOpen ? "Open" : "Close"}</Text>
            <Text>({station?.openingHours.open} - {station?.openingHours.close})</Text>
          </View>
          <Text className="mt-1 text-xs">{station?.formattedAddress}</Text>
        </View>
      </View>

      {getQueue.length == 0 ? (
        <BottomButtons
          leftText={"Send Waste"}
          leftClick={() => handleQueue("Send")}
          rightText={"Drop Waste"}
          rightClick={() => handleQueue("Drop")} />
      ) : (
        getQueue[0].orderType == "Send" ? (
          <BottomButtons
          leftType={"Red"}
          leftText={"Cancel"}
          leftClick={() => deleteQueue(getQueue[0])}
          rightText={"Chat Station"}
          rightClick={() => router.push({pathname: 'chat/chat', params: {station: station._id}})} />
        ) : (
          <BottomButtons
          leftType={"Red"}
          leftText={"Cancel"}
          leftClick={() => deleteQueue(getQueue[0])}
          rightText={"Directions"}
          rightClick={() => Linking.openURL(station?.gmapUrl)} />
        )
      )}
    </BottomSheet>
  )
}