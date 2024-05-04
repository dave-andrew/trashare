import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function BottomButtons({ leftType, leftText, leftClick, rightType, rightText, rightClick }: { leftType?: string, leftText: string, leftClick: () => void, rightType?: string, rightText: string, rightClick: () => void }) {

  const [cancelVisible, setCancelVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCancelVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const leftColor = leftType === 'Red' ? '#fecaca' : '#00B1F7';
  const rightColor = rightType === 'Red' ? '#fecaca' : '#00B1F7';

  const leftFont = leftType === 'Red' ? '#ef4444' : '#fff';
  const rightFont = rightType === 'Red' ? '#ef4444' : '#fff';

  return (
    <View className='flex flex-row justify-between'>

      {cancelVisible && (
        <Pressable
          style={{ backgroundColor: leftColor }}
          className='w-[49%] py-2 rounded-full'
          onPress={() => {
            leftClick()
          }}>
          <Text style={{ color: '#ef4444' }} className='color-white font-medium text-center'>Cancel</Text>
        </Pressable>
      )}

      <Pressable
        style={{ backgroundColor: rightColor }}
        className={(cancelVisible) ? 'w-[49%] py-2 rounded-full' : 'w-[100%] py-2 rounded-full'}
        onPress={() => {
          rightClick();
        }}>
        <Text style={{ color: rightFont }} className='color-white font-medium text-center'>{rightText}</Text>
      </Pressable>
    </View>
  );
}
