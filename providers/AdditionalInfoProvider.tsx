import {useCallback, useEffect, useState} from "react";
import {useAuth, useQuery, useRealm, useUser} from "@realm/react";
import {User} from "../models/User";
import AdditionalInfoPage from "../app/additionalInfoPage";

interface AdditionalUserInput {
    username: string,
    phone: string,
}

export default function AdditionalInfoProvider({children}: { children: React.ReactNode }) {

    const realm = useRealm()
    const user = useUser()

    const additionalInfoList = useQuery(User).filtered(`_id == "${user.id}"`);
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(additionalInfoList)
        })
    }, [user]);

    if(additionalInfoList.length == 0) {
        return (
            <AdditionalInfoPage user_id={user.id}/>
        )
    } else {
        return (
            <>
                {children}
            </>
        );
    }

}