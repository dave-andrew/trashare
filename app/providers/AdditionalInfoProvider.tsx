import { createContext, useEffect, useState } from "react";
import { useRealm, useUser } from "@realm/react";
import AdditionalInfoPage from "../miscPage/additionalInfoPage";
import { getAdditionalInfo } from "../datas/queries/useQueries";
import { User } from "../../models/User";

export const AdditionalInfoContext = createContext(null)

export default function AdditionalInfoProvider({ children }: { children: React.ReactNode }) {

    const realm = useRealm()
    const user = useUser()
    const [additionalInfo, setAdditionalInfo] = useState<User>()

    const additionalInfoList = getAdditionalInfo(realm, user.id)
    
    if (additionalInfoList?.length == 0) {
        return (
            <AdditionalInfoPage user_id={user.id} setStateContext={setAdditionalInfo} />
        )
    } else {
        if(additionalInfo != additionalInfoList[0]){
            setAdditionalInfo(additionalInfoList[0])
        }
        console.log(additionalInfo);
        return (
            <AdditionalInfoContext.Provider value={{additionalInfo, setAdditionalInfo}}>
                {children}
            </AdditionalInfoContext.Provider>
        );
    }
}