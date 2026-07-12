
import AddStoryForm from '@/components/AddStory/AddStoryForm/addStoryForm'
import css from './AddStory.module.css'
import { PageTitle } from '@/components/UI/PageTitle/PageTitle'

export default async function AddStory() {
    return (
        <div className={css.addStory}>
            
            <div className="container">
                <PageTitle className={css.titlePage} tag='h1'>Створити нову історію</PageTitle>
                <AddStoryForm />
            </div>
        </div>
    )
}
