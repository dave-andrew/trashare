import { Image, Pressable, Text, View } from "react-native"

export default function BottomButtons({ leftType, leftText, leftClick, rightType, rightText, rightClick }: { leftType?: string, leftText: string, leftClick: () => void, rightType?: string, rightText: string, rightClick: () => void}) {

  const leftColor = leftType == "Red" ? "#fecaca" : "#00B1F7"
  const rightColor = rightType == "Red" ? "#fecaca" : "#00B1F7"

  const leftFont = leftType == "Red" ? "#ef4444" : "#fff"
  const rightFont = rightType == "Red" ? "#ef4444" : "#fff"

  return (
    <View className='flex flex-row justify-between'>
      <Pressable
        style={{ backgroundColor: leftColor }}
        className='w-[49%] py-2 rounded-full'
        onPress={() => {
          leftClick()
        }}>
        <Text style={{ color: leftFont}} className='color-white font-medium text-center'>{leftText}</Text>
      </Pressable>

      <Pressable
        style={{ backgroundColor: rightColor }}
        className='w-[49%] py-2 rounded-full'
        onPress={() => {
          rightClick()
        }}>
        <Text style={{ color: rightFont}} className='color-white font-medium text-center'>{rightText}</Text>
      </Pressable>
    </View>
  )
}