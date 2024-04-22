import { useRouter } from "expo-router";



export default function Rediect() {
    
    const router = useRouter();

    router.push('/auth')

    return (
        <></>
    )

}