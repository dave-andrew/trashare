import { Text, View, Image, Pressable, PermissionsAndroid } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { WastePlaceholder } from '../../app/finish/finishPage';
import * as ImagePicker from 'react-native-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import { useRealm } from '@realm/react';
import { useLocalSearchParams } from 'expo-router';
import { getHistoryById } from '../../app/datas/queries/useQueries';

export default function WasteDataCard({ index, wasteList, setWasteList }: { index: number, wasteList: WastePlaceholder[], setWasteList: (list: WastePlaceholder[]) => void }) {
  
  const realm = useRealm()
  const queue_id = useLocalSearchParams().id;
  const queue = getHistoryById(realm, queue_id?.toString())

  const handleWeightChange = (weight: string) => {
    console.log('wastes',wasteList)
    const newList = [...wasteList]
    newList[index].weight = parseFloat(weight)
    setWasteList(newList)
  }

  const handleTypeChange = (type: string) => {
    const newList = [...wasteList]
    newList[index].wasteType = type
    setWasteList(newList)
    console.log('wastes',wasteList)
  }
  const handleDelete = () => {
    if (wasteList.length <= 1) return
    const newList = [...wasteList]
    newList.splice(index, 1)
    setWasteList(newList)
    console.log('wastes',wasteList)
  };

  const handleAddImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const cameraOptions: ImagePicker.CameraOptions = {
          mediaType: 'photo',
          saveToPhotos: true,
          quality: 1,
        }
        ImagePicker.launchCamera(cameraOptions, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera picker');
          }
          if (!response.assets) {
            console.log('No image selected');
          }
          const fetchResponse = await fetch(response.assets[0].uri);
          const theBlob = await fetchResponse.blob();

          const imageRef = ref(storage, `waste-pictures/${queue._id}/${index}`);
          const uploadTask = uploadBytesResumable(imageRef, theBlob);

          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              console.log("Error uploading image: ", error);
            },
            async () => {
              console.log('Upload is done');
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              const newList = [...wasteList];
              newList[index].imageUrl = downloadURL;
              setWasteList(newList)
            }
          )
        });
      } else {
        console.log("Camera permission denied!");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View
       className='flex flex-col m-2 p-4 rounded-lg bg-white'
       style={{ elevation: 3 }}>
       <Pressable
        className='rounded-full absolute z-10 bg-white w-10 h-10 flex items-center justify-center top-6 right-6'
        onPress={() => handleDelete()}>
        <FontAwesome name='close' size={28} color={"#ccc"} />
      </Pressable>

      <Pressable className='w-full' onPress={() => handleAddImage()}>
        {wasteList[index].imageUrl != '' ?
          <Image source={{ uri: wasteList[index].imageUrl }} className='w-full h-40 rounded-lg' />
          :
          <View className='w-full h-40 rounded-lg bg-[#ccc] flex items-center justify-center'>
            <FontAwesome name='camera' size={40} color={'#a0a0a0'} />
            <Text className='text-[#a0a0a0]'>Click to add image</Text>
          </View>
        }
      </Pressable>

      <View className='flex flex-row justify-between mt-4'>
        <TextInput
          className={"rounded-full border border-gray-400 py-2 px-4 w-[45%]"}
          placeholder={"Weight (g)"}
          value={wasteList[index].weight ? wasteList[index].weight.toString() : ''}
          onChangeText={(text) => handleWeightChange(text)}
          keyboardType='numeric'
        />
    <WasteTypeSelector wasteType={wasteList[index].wasteType} setWasteType={handleTypeChange} />
      </View>
    </View>
  )
}