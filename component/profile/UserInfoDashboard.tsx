import { Text, View } from "react-native";
import { User } from "../../models/User";



export default function UserInfoDashboard({ additionalInfo }: { additionalInfo: User }) {
    return (
        <View style={[{
            marginTop: 20,
        }]}>
            <Text style={[{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center'
            }]}>{additionalInfo?.username}</Text>
            <Text style={[{
                fontSize: 14,
                textAlign: 'center'
            }]}>{additionalInfo?.gender}</Text>
            <Text style={[{
                fontSize: 14,
                textAlign: 'center'
            }]}>+62{additionalInfo?.phone}</Text>
        </View>
    )
}