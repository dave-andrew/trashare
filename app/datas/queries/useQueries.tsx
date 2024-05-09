import { useQuery } from "@realm/react";
import { User } from "../../../models/User";
import { News } from "../../../models/News";
import { AdditionalInfoContext } from "../../providers/AdditionalInfoProvider";
import { useContext, useEffect } from "react";
import { History } from "../../../models/History";
import { Station } from "../../../models/Station";
import { Chat } from "../../../models/Chat";


export const getAdditionalInfo = (realm, user_id) => {
    const users = useQuery(User).filtered(`_id == "${user_id}"`);

    useEffect(() => {
        realm?.subscriptions?.update(mutableSubs => {
            mutableSubs.add(users)
        })
    }, [realm, users])
    return users
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
    return getAllHistory(realm).filtered('orderer == $0 ', additionalInfo._id).sorted('createdAt', true);
    // return getAllHistory(realm).filtered("_id == oid(663c960a0c1b1d33c5175f06) ").sorted('createdAt', true);
}


export const getStationHistory = (realm) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return getAllHistory(realm).filtered('station == $0', additionalInfo.station).filtered('isComplete == true').sorted('createdAt', true);
}

export const getHistoryById = (realm, id) => {
    return getAllHistory(realm).filtered(`_id == oid(${id})`)[0];
}

export const getUserQueue = (realm) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return getAllHistory(realm).filtered('orderer == $0', additionalInfo._id).filtered('isComplete == false');
}

export const getStationQueue = (realm) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return getAllHistory(realm).filtered('station == $0', additionalInfo.station).filtered('isComplete == false').sorted('createdAt', true);
}

export const getUserChat = (station, orderer) => {
    return useQuery(Chat).filtered('station == $0 AND user == $1', station, orderer);
}

export const getStationChat = (orderer) => {
    const { additionalInfo } = useContext(AdditionalInfoContext);
    return useQuery(Chat).filtered('station == $0 AND user == $1', additionalInfo.station, orderer);
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
