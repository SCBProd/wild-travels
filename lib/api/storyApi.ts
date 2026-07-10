import { nextServer } from "./api";
import type { StoryResponse } from "../../types/story";
import { cookies } from 'next/headers';
import { Story } from '@/types/story';

export const getStoryById = async (
  id: string
): Promise<StoryResponse> => {
  const response = await nextServer.get(`/stories/${id}`);
  return response.data;
};


interface OwnStories{
page:number;
perPage:number;
totalItems:number;
totalPages:number;  
stories:Story[]
}


export const GetOwnStoriesServer = async ():Promise<OwnStories> => {
  const cookieStore = await cookies();
  const {data} = await nextServer.get('/api/profile/own', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const GetSavedStoriesServer = async() =>{
  const cookieStore = await cookies();
  const {data} = await nextServer.get('/api/profile/saved-stories', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
