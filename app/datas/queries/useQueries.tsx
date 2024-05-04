import { useQuery } from "@realm/react";
import { User } from "../../../models/User";
import { News } from "../../../models/News";
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider";
import { useContext } from "react";
import { History } from "../../../models/History";
import { Station } from "../../../models/Station";

export const getAdditionalInfo = (user_id) => {
    return useQuery(User).filtered(`_id == "${user_id}"`);
}


export const getNews = () => {
    return useQuery(News).sorted('createdAt', true)
}

// check if there is a queue that is not completed and the orderer is the same as the logged in user
export const getUserHistory = () => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(History).filtered('orderer == $0', additionalInfo).sorted('createdAt', true);
}

export const getHistoryById = (id) => {
    return useQuery(History).filtered(`_id == oid(${id})`)[0];
}

export const getStations = () => {
    return useQuery(Station);
}

