import { Text, View } from "react-native";
import { User } from "../../models/User";



export default function UserInfoDashboard({ userAdditionalInfo }: { userAdditionalInfo: User }) {
    return (
        <View style={[{
            marginVertical: 40,
        }]}>
            <Text style={[{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center'
            }]}>{userAdditionalInfo.username}</Text>
            <Text style={[{
                fontSize: 14,
                textAlign: 'center'
            }]}>{userAdditionalInfo.gender}</Text>
            <Text style={[{
                fontSize: 14,
                textAlign: 'center'
            }]}>+62{userAdditionalInfo.phone}</Text>
        </View>
    )
}