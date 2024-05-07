import { Text, View, Image, Pressable, PermissionsAndroid } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { WastePlaceholder } from '../../app/finish/finishPage';
import * as ImagePicker from 'react-native-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

export default function WasteDataCard({ index, wasteList, setWasteList }: { index: number, wasteList: WastePlaceholder[], setWasteList: (list: WastePlaceholder[]) => void }) {

  const handleWeightChange = (weight: string) => {
    setWasteList((prevList) => {
      const newList = [...prevList];
      newList[index].weight = weight;
      return newList;
    });
  }
  const handleTypeChange = (type: string) => {
    setWasteList((prevList) => {
      const newList = [...prevList];
      newList[index].wasteType = type;
      return newList;
    });
  }
  const handleDelete = () => {
    if (wasteList.length <= 1) return
    setWasteList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
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
      const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
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

          const imageRef = ref(storage, `waste-pictures/${index}`);
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
              setWasteList((prevList) => {
                const newList = [...prevList];
                newList[index].imageUrl = downloadURL;
                return newList;
              });
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