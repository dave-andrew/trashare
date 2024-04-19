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
          {path}
        </Text>
      </View>
    </View>
  );
}
