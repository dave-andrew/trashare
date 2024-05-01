import { useQuery, useRealm } from "@realm/react";
import { News } from "../../models/News";
import { useCallback, useEffect } from "react";
import { Button, Text } from "react-native";
import { User } from "../../models/User";


export default function Newseeder() {
    const realm = useRealm();
    const newsList = useQuery(News);

    const addNews =  useCallback((n) => {
        const a = realm.write(() => {
            
            return realm.create(News, n);
        });
        
        return a 
    }, [realm, newsList])

    const seedNews = async () => {
        if (newsList.length > 0) {
            console.log("News already seeded");
            return;
        }

        const news = [
            {
                title: "Turning the tide on Indonesia's waste crisis",
                imageLink: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*S6u89bX8ogjAh8t2",
                newsLink: "https://medium.com/@ahanagarwal/turning-the-tide-on-indonesias-waste-crisis-9c2ab921b7a8",
            },
            {
                title: "Promoting biomass as a source of renewable energy in Indonesia",
                imageLink: "https://asianews.network/wp-content/uploads/bfi_thumb/2018_04_25_44825_1524631732._large-78lr1s45r5kzysc7afrqc0s4mo1imbsq55cuswdpo3k.jpg",
                newsLink: "https://asianews.network/promoting-biomass-as-a-source-of-renewable-energy-in-indonesia/"
            },
            {
                title: "The waste challenge: Is Indonesia at a tipping point?",
                imageLink: "https://img.jakpost.net/c/2019/02/21/2019_02_21_66075_1550760749._large.jpg",
                newsLink: "https://www.thejakartapost.com/academia/2019/03/01/the-waste-challenge-is-indonesia-at-a-tipping-point-1551431355.html"
            },
            {
                title: "Indonesia Sustainable Energy Week (ISEW) 2022",
                imageLink: "https://iesr.or.id/wp-content/uploads/2022/09/ISEW-Flyer-QR-Code.jpg",
                newsLink: "https://iesr.or.id/agenda-iesr/indonesia-sustainable-energy-week-isew-2022"
            },
            {
                title: "Energy Policies Beyond IEA Countries: Indonesia 2015",
                imageLink: "https://iea.imgix.net/2cb71ed8-1deb-417f-a0b9-51e823411a7a/AerialviewofJakartaIndonesia.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C4266%2C2842&w=1280&fit=crop&fm=jpg&q=70&auto=format&h=853",
                newsLink: "https://www.iea.org/reports/energy-policies-beyond-iea-countries-indonesia-2015",
            }
        ];


        news.map(n => {
            return addNews(n);
        })

        
    };

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(newsList);
        })
    }, [realm, newsList])

    return (
        <>
            <Text>newseeder</Text>
            <Button title="Seed news" onPress={seedNews}></Button>
        </>
    )
}
