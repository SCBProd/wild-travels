import TravellerPublicProfile from "@/components/TravellerPage/TravellerPublicProfile/TravellerPublicProfile";
import { Metadata } from "next";
import ProfileTabs from "@/components/ProfilePage/ProfileTabs/ProfileTabs";
import {GetMeServer} from "@/lib/api/serverApi"
export async function generateMetadata(): Promise<Metadata> {

    return {
    title: `Profile page`,
    description: `You can update your account on this page`,
    openGraph:{
    title: `Profile page`,
    description: `You can update your account on this page`,
    url: `${process.env.base_url}/profile`,
    images: [{
      url: "https://shepit.biz/wp-content/uploads/2025/07/chatgpt-image-10-yyul.-2025-g.-12_58_24.png",
      width: 1200,
      height: 630,
      alt : "n",
    }]
  }
  }
}


export default async function Profile(){

    const user = await GetMeServer();
    console.log(user);
    return(
        <>
                <TravellerPublicProfile traveller={user}/>
                <ProfileTabs/>
        </>
        )
}