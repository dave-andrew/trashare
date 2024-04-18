import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View>
        <Text>
          Open up the code for this screen:
        </Text>

        <Text>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>
    </View>
  );
}
