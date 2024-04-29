import { createContext, useEffect, useState } from "react";
import { useRealm, useUser } from "@realm/react";
import AdditionalInfoPage from "../additionalInfoPage";
import { getAdditionalInfo } from "../datas/queries/userQueries";

export const AdditionalInfoContext = createContext(null)

export default function AdditionalInfoProvider({ children }: { children: React.ReactNode }) {

    const realm = useRealm()
    const user = useUser()
    const [additionalInfo, setAdditionalInfo] = useState(null)

    const additionalInfoList = getAdditionalInfo(user.id)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(additionalInfoList)
        })
    }, [user]);

    useEffect(() => {
        setAdditionalInfo(additionalInfoList[0])
    }, [])
    
    if (additionalInfoList?.length == 0) {
        return (
            <AdditionalInfoPage user_id={user.id} setStateContext={setAdditionalInfo} />
        )
    } else {
        return (
            <AdditionalInfoContext.Provider value={additionalInfo}>
                {children}
            </AdditionalInfoContext.Provider>
        );
    }



}