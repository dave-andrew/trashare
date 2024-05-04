import { useQuery } from "@realm/react";
import { User } from "../../../models/User";
import { News } from "../../../models/News";
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider";
import { useContext } from "react";
import { History } from "../../../models/History";
import { Station } from "../../../models/Station";
import { Chat } from "../../../models/Chat";
import { BSON } from "realm";

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

export const getUserQueue = () => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(History).filtered('orderer == $0', additionalInfo).filtered('isComplete == false');

}

export const getStations = () => {
    return useQuery(Station);
}

export const getStationQueue = () => {
    return useQuery(History);
}

export const getUserChat = (station: Station) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(Chat).filtered('user == $0', additionalInfo).filtered('station == $1', station);
}

export const getStationChat = (orderer: User) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(Chat).filtered('station == $0', additionalInfo.station).filtered('user == $1', orderer);
}

export const getStationById = (station_id) => {
    return useQuery(Station).filtered(`_id == oid${station_id}`)[0];
}
