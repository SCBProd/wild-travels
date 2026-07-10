import Image from 'next/image';

import styles from './TravellerStoriesList.module.css';
import { Story } from '@/types/story';
interface Props {
  stories: Story[];
}

export default function TravellerStoriesList({stories}: Props) {
  console.log(stories);
  
  return (
    <div className={styles.travellerInfo}>
      <ul>
        {stories.map((story) => (
          <li key={story._id}> 
            <h2>{story.title}</h2>
            <p>Автор:{story.ownerId ? story.ownerId : 'Ви'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



