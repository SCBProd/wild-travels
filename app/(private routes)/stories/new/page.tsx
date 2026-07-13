
import AddStoryForm from '@/components/AddStory/AddStoryForm/addStoryForm'
import css from './AddStory.module.css'
import PageTitle from '@/components/HomePage/PageTitle/PageTitle'
import { Metadata } from 'next'
import { getCategories } from '@/lib/api/storyApi'

export const metadata: Metadata = {
    title: 'Створити нову історію',
    description: 'Створіть та поділіться своєю новою історією.',
    robots: {
        index: false,
        follow: false,
    },
}

export default async function AddStory() {

    const res = await getCategories()

    const categories = res.data.map((item) => item.category)

    return (
        <div className={css.addStory}>
            
            <div className="container">
                <div className={css.titlePage}>
                    <PageTitle>Створити нову історію</PageTitle>
                </div>
                <AddStoryForm categories={categories} />
            </div>
        </div>
    )
}
