import React, { useEffect, useState } from 'react';
import { useApp, useAuth, useQuery, useRealm, useUser } from '@realm/react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Task } from '../models/Task';
import { OfflineModeButton } from './OfflineModeButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AppSync: React.FC = () => {
  const realm = useRealm();
  const user = useUser();
  const app = useApp();
  const { logOut } = useAuth();
  const [showDone, setShowDone] = useState(false);
  const tasks = useQuery(
    Task,
    collection =>
      showDone
        ? collection.sorted('createdAt')
        : collection.filtered('isComplete == false').sorted('createdAt'),
    [showDone],
  );

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(tasks);
    });
  }, [realm, tasks]);

  return (
    <SafeAreaView>
      <Text>Syncing with app id: {app.id}</Text>
      <Text className="pt-8">Tasks:</Text>
      <Pressable onPress={logOut} className='m-6'>
        <Text>{`Logout ${user?.profile.email}`}</Text>
      </Pressable>
      <OfflineModeButton />
    </SafeAreaView>
  );
};
