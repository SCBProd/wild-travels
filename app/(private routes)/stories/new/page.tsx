
import AddStoryForm from '@/components/AddStory/AddStoryForm/addStoryForm'
import css from './AddStory.module.css'

export default function AddStory() {
    return (
        <div className={css.addStory}>
            <div className="container">
                
                <AddStoryForm />
            </div>
        </div>
    )
}
