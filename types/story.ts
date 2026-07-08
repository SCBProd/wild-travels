export type Story = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string;
  date: string;
  rate: number;
  savedCount: number;
  ownerId: {
    _id: string;
    name: string;
  };
  isSaved: boolean;
};

export type StoryResponse = {
  story: Story;
  recommendedStories: Story[];
};