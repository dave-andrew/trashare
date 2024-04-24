import {useCallback, useEffect, useState} from "react";
import {useAuth, useQuery, useRealm, useUser} from "@realm/react";
import {User} from "../models/User";

export default function AdditionalInfoProvider({children}: { children: React.ReactNode }) {

    // const realm = useRealm()
    // const user = useUser()
    //
    // const additionalInfo = useQuery(
    //     User,
    //     (collection) => {
    //         return user.email ?
    //             collection.filtered(`email == ${user.email}`) :
    //             collection.filtered("email == 'false'"); // Return empty array if no email
    //     },
    //     [user.id]
    // )
    //
    // useEffect(() => {
    //     if(additionalInfo.length === 0) {
    //         realm.write(() => {
    //             realm.create(User, {
    //                 email: user.email,
    //                 username: 'Test Additional Info',
    //                 phone: '08181818',
    //             })
    //         })
    //     }
    // }, [user]);
    // const registerUser = useCallback(
    //     ({username, email, phone}) => {
    //         const newUser = realm.write(() => {
    //             return realm.create(User, {
    //                 username: username,
    //                 email: email,
    //                 phone: phone,
    //             })
    //         })
    //
    //         console.log(newUser)
    //     }, [realm]
    // );

    return (
        <>
            {children}
        </>
    );
}