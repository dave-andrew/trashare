import { useCallback } from 'react';
import { useRealm } from '@realm/react';
import { User } from '../models/User';
import { Button } from 'react-native';

export const UserManager : React.FC<{
    user: User & Realm.Object;
    onUserChange: (user: User) => void;
}> = ({user, onUserChange}) => {
    const realm = useRealm();

    const addUser = useCallback((newUser: User & Realm.Object) => {
        if(!newUser) {
            return;
        }
        
        realm.write(() => {
            return realm.create('User', newUser);
        });
    }, [realm, user, onUserChange]);

    const updateUser = useCallback((oldUser: User & Realm.Object, updatedUser: User & Realm.Object) => {
        if(!updatedUser) {
            return;
        }

        realm.write(() => {
            oldUser.username = updatedUser.username;
            oldUser.email = updatedUser.email;
            oldUser.phone = updatedUser.phone;
            oldUser.points = updatedUser.points;
            oldUser.profileUrl = updatedUser.profileUrl;
        });
        onUserChange(updatedUser);
    }, [realm, onUserChange]);


    return (
        <>
            
        </>
    );
};
