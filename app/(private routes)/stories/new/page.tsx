
import AddStoryForm from '@/components/AddStory/AddStoryForm/addStoryForm'
import css from './AddStory.module.css'
import PageTitle from '@/components/HomePage/PageTitle/PageTitle'
import { getCategories } from '@/lib/api/storyApi'


export default async function AddStory() {

    const res = await getCategories()

    const categories = res.data.map((item) => item.category)

    
    return (
        <div className={css.addStory}>
            
            <div className="container">
                <PageTitle >Створити нову історію</PageTitle>
                <AddStoryForm categories={categories} />
            </div>
        </div>
    )
}
