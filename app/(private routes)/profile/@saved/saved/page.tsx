import { GetSavedStoriesServer } from "@/lib/api/storyApi";
import SavedStoriesClient from "./SavedStoriesClient";



export default async function SavedStories() {
  const {data} = await GetSavedStoriesServer();
  
  return (
    <SavedStoriesClient savedStories={data} />
  );
}