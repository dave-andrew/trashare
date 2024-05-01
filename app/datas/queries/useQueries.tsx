import { useQuery } from "@realm/react";
import { User } from "../../../models/User";
import { News } from "../../../models/News";


export const getAdditionalInfo = (user_id) => {
    return useQuery(User).filtered(`_id == "${user_id}"`);
}

export const getNews = () => {
    return useQuery(News).sorted('createdAt', true)
}