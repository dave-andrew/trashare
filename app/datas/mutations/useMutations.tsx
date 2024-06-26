import { useCallback, useEffect } from "react"
import { News } from "../../../models/News"
import { Station } from "../../../models/Station"
import { History } from "../../../models/History"
import { User } from "../../../models/User"
import { Chat } from "../../../models/Chat"

export function useQueueMutation(realm, queue) {
    const addQueue = (queue) => {
        realm.write(() => {
            return realm.create(History, queue)
        })
    }

    const completeQueue = (queue) => {
        realm.write(() => {
            queue.isComplete = true
        })
    }

    const deleteQueue = (queue) => {
        realm.write(() => {
            realm.delete(queue)
        })
    }

    const finishOrder = (queue, wasteList) => {
        realm.write(() => {
            queue.isComplete = true
            queue.waste = wasteList
        })
    }

    // useEffect(() => {
    //     realm.subscriptions.update(mutableSubs => {
    //         console.log("Use Effect Realm Called");
    //         mutableSubs.add(queue)
    //         console.log("Use Effect Realm2 Called");
    //     })
    //     console.log("Use Effect Called");
    // }, [realm, queue])
    
    return {
        addQueue,
        deleteQueue,
        finishOrder
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

export const useUserMutation = (realm, userList) => {
    const updatePoints = useCallback((user: User) => {
        realm.write(() => {
            user.points = 0
        })
    }, [realm, userList])

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(userList);
        })
    }, [realm, userList])

    return {
        updatePoints,
    }
}