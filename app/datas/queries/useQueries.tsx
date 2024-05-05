import { useQuery } from "@realm/react";
import { User } from "../../../models/User";
import { News } from "../../../models/News";
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider";
import { useContext, useEffect } from "react";
import { History } from "../../../models/History";
import { Station } from "../../../models/Station";
import { Chat } from "../../../models/Chat";


export const getAdditionalInfo = (user_id) => {
    return useQuery(User).filtered(`_id == "${user_id}"`);
}

export const getNews = () => {
    return useQuery(News).sorted('createdAt', true)
}

export const getAllHistory = (realm) => {
    const histories = useQuery(History)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(histories)
        })
    }, [realm, histories])
    return histories;
}

export const getUserHistory = (realm) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return getAllHistory(realm).filtered('orderer == $0', additionalInfo).sorted('createdAt', true);
}

export const getHistoryById = (realm, id) => {
    return getAllHistory(realm).filtered(`_id == oid(${id})`)[0];
}

export const getUserQueue = (realm) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return getAllHistory(realm).filtered('orderer == $0', additionalInfo).filtered('isComplete == false');
}

export const getStationQueue = (realm) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return getAllHistory(realm).filtered('station == $0', additionalInfo.station).filtered('isComplete == false').sorted('createdAt', true);
}

export const getUserChat = (station) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(Chat).filtered('station == $0 AND user == $1', station, additionalInfo);
}

export const getStationChat = (orderer) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(Chat).filtered('station == $0', additionalInfo.station).filtered('user == $1', orderer);
}

export const getStations = (realm) => {
    const stations = useQuery(Station);
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(stations)
        })
    }, [realm, stations])
    return stations;
}

export const getStationById = (realm, station_id) => {
    return getStations(realm).filtered(`_id == oid(${station_id})`)[0];
}
