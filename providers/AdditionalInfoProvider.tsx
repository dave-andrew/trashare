import {useCallback, useEffect, useState} from "react";
import {useAuth, useQuery, useRealm, useUser} from "@realm/react";
import {User} from "../models/User";
import {Task} from "../models/Task";

export default function AdditionalInfoProvider({children}: { children: React.ReactNode }) {

    const realm = useRealm()
    const user = useUser()

    const additionalInfoList = useQuery(User);
    console.log(additionalInfoList)

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(additionalInfoList)
        })
        if (additionalInfoList.length === 0) {
            registerUser({user_id: user.id, username: "test 2 harusnya bisa", phone: "08181818"})
            console.log("registering user")
        }
    }, [user]);


    // useEffect(() => {
    //     realm.subscriptions.update(mutableSubs => {
    //         mutableSubs.add(additionalInfoList)
    //     })
    // }, [realm, additionalInfoList]);

    const registerUser = useCallback(
        ({user_id, username, phone}) => {
            const newUser = realm.write(() => {
                return realm.create(User, {
                    _id: user_id,
                    username: username,
                    phone: phone,
                })
            })

            console.log(newUser)
        }, [realm]
    );

    return (
        <>
            {children}
        </>
    );
}