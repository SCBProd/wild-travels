import { GetOwnStoriesServer } from '@/lib/api/serverApi';
import MyStoriesClient from './MyStoriesClient';
import { StoriesResponse } from '@/types/story';

export default async function MyStoriesPage() {
  const res = await GetOwnStoriesServer();
  

  return (
    <MyStoriesClient res={res as unknown as StoriesResponse}/>
  );
}