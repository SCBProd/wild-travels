'use client'

import TravellerStoriesList from "@/components/TravellerPage/TravellerStoriesList/TravellerStoriesList";
import { Story } from "@/types/story"

interface Props{
savedStories:Story[]
}
export default function SavedStoriesClient({savedStories}:Props){
    console.log(savedStories);
        
        
        return (
      <>
        {savedStories && savedStories.length > 0 ? (<TravellerStoriesList stories={savedStories}/>) : (
          <>no saved stories</>
        )}
      </>
        )
}