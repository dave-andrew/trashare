import { useCallback, useEffect } from "react"
import { News } from "../../../models/News"
import { Station } from "../../../models/Station"
import { History } from "../../../models/History"
import { User } from "../../../models/User"
import { Chat } from "../../../models/Chat"

export function useQueueMutation(realm, queue) {
    const addQueue = useCallback((queue) => {
        realm.write(() => {
            return realm.create(History, queue)
        })
    }, [realm])

    const completeQueue = useCallback((queue) => {
        realm.write(() => {
            queue.isComplete = true
        })
    }, [realm])

    const deleteQueue = useCallback((queue) => {
        realm.write(() => {
            realm.delete(queue)
        })
    }, [realm])

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(queue)
        })
    }, [realm, queue])

    return {
        addQueue,
        deleteQueue,
    }
}

export function useNewsMutation(realm, newsList) {
    const addNews = useCallback((n) => {
        return realm.write(() => {
            return realm.create(News, n);
        });
    }, [realm, newsList])

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(newsList);
        })
    }, [realm, newsList])

    return {
        addNews,
    }
}

export function useStationMutation(realm, stationList) {
    const addStation = useCallback((station) => {
        return realm.write(() => {
            return realm.create(Station, station);
        });
    }, [realm, stationList])

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(stationList);
        })
    }, [realm, stationList])

    return {
        addStation,
    }
}

export function useChatMutation(realm, chatList) {
    const createChat = useCallback((chat) => {
        return realm.write(() => {
            return realm.create(Chat, chat);
        });
    }, [realm, chatList])

    const addMessage = useCallback((chat, message) => {
        return realm.write(() => {
            chat.message.push(message)
        })
    }, [realm, chatList]);

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(chatList);
        })
    }, [realm, chatList])

    return {
        createChat,
        addMessage
    }
}