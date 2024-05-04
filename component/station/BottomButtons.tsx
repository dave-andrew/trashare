import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { getUserQueue } from '../../app/datas/queries/useQueries';

export default function BottomButtons({ leftType, leftText, leftClick, rightType, rightText, rightClick }: { leftType?: string, leftText: string, leftClick: () => void, rightType?: string, rightText: string, rightClick: () => void }) {

  const [cancelVisible, setCancelVisible] = useState(true);
  const getQueue = getUserQueue();

  useEffect(() => {
    setCancelVisible(true);
    const timer = setTimeout(() => {
      setCancelVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [leftClick]);

  const leftColor = leftType === 'Red' ? '#fecaca' : '#00B1F7';
  const rightColor = rightType === 'Red' ? '#fecaca' : '#00B1F7';

  const leftFont = leftType === 'Red' ? '#ef4444' : '#fff';
  const rightFont = rightType === 'Red' ? '#ef4444' : '#fff';

  return (
    <View className='flex flex-row justify-between'>
      {getQueue.length === 0 && (
        <Pressable
          style={{ backgroundColor: leftColor }}
          className='w-[49%] py-2 rounded-full'
          onPress={leftClick}>
          <Text style={{ color: leftFont }} className='color-white font-medium text-center'>{leftText}</Text>
        </Pressable>
      )}

      {(cancelVisible && getQueue.length > 0) && (
        <Pressable
          style={{ backgroundColor: leftColor }}
          className='w-[49%] py-2 rounded-full'
          onPress={leftClick}>
          <Text style={{ color: '#ef4444' }} className='color-white font-medium text-center'>Cancel</Text>
        </Pressable>
      )}
      <Pressable
        style={{ backgroundColor: rightColor }}
        className={getQueue.length === 0 ? 'w-[49%] py-2 rounded-full' : (!cancelVisible ? 'w-[100%] py-2 rounded-full' : 'w-[49%] py-2 rounded-full')}
        onPress={rightClick}>
        <Text style={{ color: rightFont }} className='color-white font-medium text-center'>{rightText}</Text>
      </Pressable>
    </View>
  );
}
