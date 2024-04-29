import { useQuery } from "@realm/react";
import { User } from "../../../models/User";


export const getAdditionalInfo = (user_id) => {
    return useQuery(User).filtered(`_id == "${user_id}"`);
}