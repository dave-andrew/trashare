import BottomSheet from "@gorhom/bottom-sheet";
import { useQuery } from "@realm/react"
import { useEffect, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import { History } from "../../models/History"
import { Station } from "../../models/Station"
import { Results } from "realm"

export default function BottomStationDetail({ station, getQueue, handleQueue, deleteQueue }: { station: Station, getQueue: Results<History>, handleQueue: (method: string) => void, deleteQueue: (queue: any) => void }) {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (station) {
      if (parseInt(station.openingHours.open) < new Date().getHours() && parseInt(station.openingHours.close) > new Date().getHours()) {
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
      handleIndicatorStyle={{ backgroundColor: '#eee', width: 60, height: 6}}
    >

      <Text className='text-center text-lg font-bold'>{station.name}</Text>

      <View className='flex flex-row justify-between mt-4'>
        <Image
          style={{ borderRadius: 10 }}
          className='w-[49%] h-28'
          source={{
            uri: station.imageUrl,
          }}
        />
        <View className="w-[49%] flex">
          <View className="flex flex-row gap-1">
            <Text className={`font-bold ${isOpen ? "text-green-500" : "text-red-500"}`}>{isOpen ? "Open" : "Close"}</Text>
            <Text>({station.openingHours.open} - {station.openingHours.close})</Text>
          </View>
          <Text className="mt-1 text-xs">{station.formattedAddress}</Text>
        </View>
      </View>

      {getQueue.length == 0 ? (
        <View className='flex flex-row justify-between mt-4'>
          <Pressable
            style={{ backgroundColor: "#00B1F7" }}
            className='w-[49%] py-2 rounded-full'
            onPress={() => {
              handleQueue('send')
            }}
          >
            <Text className='color-white font-medium text-center'>Send Waste</Text>
          </Pressable>
          <Pressable
            style={{ backgroundColor: "#00B1F7" }}
            className='w-[49%] py-2 rounded-full'
            onPress={() => {
              handleQueue('visit')
            }}
          >
            <Text className='color-white font-medium text-center'>Visit Location</Text>
          </Pressable>
        </View>

      ) : (
        <View className=''>
          <Text className='font-bold'>Queue On Progress</Text>
          <Pressable
            className='bg-red-400 w-40 py-2 rounded-full flex items-center'
            onPress={() => {
              deleteQueue(getQueue[0])
            }}
          >
            <Text className='color-white font-medium'>Cancel</Text>
          </Pressable>
        </View>
      )}
    </BottomSheet>
  )
}