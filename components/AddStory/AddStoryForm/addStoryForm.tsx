'use client'

import { Field, Formik, Form, FormikHelpers, ErrorMessage } from "formik"
import Image from "next/image"
import { useEffect, useId, useRef, useState, } from "react"
import css from './addStoryForm.module.css'

import Select from "react-select"
import { selectStyles, type CategoryOption } from "./selectStyles"
import * as Yup from "yup"
import { createNewStory, getCategories } from "@/lib/api/storyApi"

type OrderFormValues = {
    img: File | undefined;
    title: string;
    category: string;
    article: string
}

type CategoryItem = {
    _id: string;
    category: string;
}

const initialValues: OrderFormValues  = {
    img: undefined,
    title: "",
    category: "Категорія",
    article: "",
}

const validationSchema = Yup.object().shape({
    img: Yup.mixed<File>().required("Оберіть файл"),
    title: Yup.string()
        .min(2, "Мінімум 2 символи")
        .max(40, "Максимум 40 символів")
        .required("Введіть заголовок"),
    category: Yup.string()
        .required("Обери категорію")
        .notOneOf(["Категорія"], "Обери категорію"),
    article: Yup.string()
        .min(12, "Мінімум 12 символів")
        .max(3000, "Максимум 3000 символів")
        .required("Залиши опис")    
})

const AddStoryForm = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [preview, setPreview] = useState<string | undefined>(undefined)
    const [placeholderSrc, setPlaceholderSrc] = useState('/Placeholder-mobile1x.webp')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const fieldId = useId()

    useEffect(() => {
        let isMounted = true

        const fetchCategories = async () => {
            try {
                const data = await getCategories ()
                if (isMounted) {
                    const apiItems =
                        Array.isArray(data)
                            ? data
                            : (typeof data === 'object' && data !== null && 'data' in data && Array.isArray(data.data)
                                ? data.data
                                : [])

                    const normalizedCategories = (apiItems as CategoryItem[])
                        .map((item) => item?.category)
                        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)

                    setCategories(normalizedCategories)
                }
            } catch (error) {
                console.error("Failed to load categories", error)
            }
        }

        void fetchCategories()

        const updatePlaceholder = () => {
            const isRetina = window.devicePixelRatio >= 2
            const width = window.innerWidth

            if (width >= 1440) {
                setPlaceholderSrc(isRetina ? '/Placeholder-desktop2x.webp' : '/Placeholder-desktop1x.webp')
                return
            }

            if (width >= 768) {
                setPlaceholderSrc(isRetina ? '/Placeholder-tablet2x.webp' : '/Placeholder-tablet1x.webp')
                return
            }

            setPlaceholderSrc(isRetina ? '/Placeholder-mobile2x.webp' : '/Placeholder-mobile1x.webp')
        }

        updatePlaceholder()
        window.addEventListener('resize', updatePlaceholder)

        return () => {
            isMounted = false
            window.removeEventListener('resize', updatePlaceholder)
        }
    }, [])

    const handleSubmit = async (
        values: OrderFormValues,
        actions: FormikHelpers<OrderFormValues>) => {
        try {
            await createNewStory({
                img: values.img as File,
                title: values.title.trim(),
                category: values.category,
                article: values.article.trim(),
            })

            setPreview(undefined)
            setIsMenuOpen(false)
        } catch (error) {
            console.error("Failed to create story", error)
        } finally {
            actions.setSubmitting(false)
            actions.resetForm()
                setPreview(undefined)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
        }
        
    }

    const options: CategoryOption[] = categories.map((category) => ({
        value: category,
        label: category,
    }))

    return(
        
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={handleSubmit}
        >
            {({ values, errors, submitCount, isValid, dirty, isSubmitting, setFieldValue, resetForm }) => {
            const isSubmitted = submitCount > 0
            const titleHasRequiredError =
                isSubmitted && Boolean(errors.title) && values.title.trim().length === 0
            const articleHasRequiredError =
                isSubmitted && Boolean(errors.article) && values.article.trim().length === 0
            const categoryHasRequiredError =
                isSubmitted
                && Boolean(errors.category)
                && (values.category.trim().length === 0 || values.category === "Категорія")
                
            const isFormReady = isValid && dirty

            const handleCancel = () => {
                resetForm()
                setPreview(undefined)
                setIsMenuOpen(false)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
            }

            return (
             <>   
            <p className={`${css.label} ${css.marginBottom16}`}>Обкладинка статті</p> 

            <Form className={css.form}>
                
                <div className={css.imageWrap}>
                    <Image
                        
                        src={preview || placeholderSrc}
                        alt="Фото Історії"
                        loading="eager"
                        fill
                        sizes="(min-width: 1440px) 1091px, (min-width: 768px) 704px, 335px"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <label htmlFor={`${fieldId}-file`} className={css.uploadLabel}>
                    Завантажити фото
                </label>

                <Field name="img">
                    {() => (
                        <input
                            ref={fileInputRef}
                            id={`${fieldId}-file`}
                            type="file"
                            name="img"
                            className={css.fileInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const img = e.currentTarget.files?.[0]
                                setFieldValue("img", img)
                                if (img) {
                                    setPreview(URL.createObjectURL(img))
                                }
                            }}
                        />
                    )}
                </Field>

                <ErrorMessage
                    name="img"
                    component="span"
                    className={css.error}/>

                <label htmlFor={`${fieldId}-title`} className={css.label}>
                    Загаловок 
                    <Field
                        id={`${fieldId}-title`}
                        type="text"
                        name="title"
                        className={`${css.placeholder} ${css.input} ${titleHasRequiredError ? css.inputError : ""}`}
                        placeholder="Введіть заголовок історії"
                    />

                    <ErrorMessage
                        name="title"
                        component="span"
                        className={css.error}/>

                </label>

                <label htmlFor={`${fieldId}-category`} className={css.label}>
                    Категорія
                    <Select
                        className={`${css.categorySelect} ${css.placeholder} ${categoryHasRequiredError ? css.categoryError : ""}`}
                        classNamePrefix="category-select"
                        styles={selectStyles}
                        instanceId={`${fieldId}-category-select`}
                        aria-invalid={categoryHasRequiredError}
                        menuIsOpen={isMenuOpen}
                        onMenuOpen={() => setIsMenuOpen(true)}
                        onMenuClose={() => setIsMenuOpen(false)}
                        maxMenuHeight={9999}
                        menuPlacement="bottom"
                        menuPosition="absolute"
                        menuShouldScrollIntoView={false}
                        inputId={`${fieldId}-category`}
                        name="category"
                        options={options}
                        placeholder="Оберіть категорію"
                        value={options.find(
                            (option) => option.value === values.category
                        ) || null}
                        onChange={(option) =>
                            setFieldValue("category", option?.value ?? "")
                        }
                    />
                    <ErrorMessage
                        name="category"
                        component="span"
                        className={css.error}/>

                </label>

                <label htmlFor={`${fieldId}-article`}className={css.label}>
                    Текст історії
                    <Field
                        id={`${fieldId}-article`}
                        as="textarea"
                        name="article"
                        rows={5}
                        className={`${css.placeholder} ${css.input} ${css.textarea} ${articleHasRequiredError ? css.inputError : ""}`}
                        placeholder="Ваша історія тут"
                    />

                    <ErrorMessage
                        name="article"
                        component="span"
                        className={`${css.error}`}/>
                </label>

                <div className={css.buttonContainer}>
                    <button
                        type="submit"
                        className={isFormReady  ? css.normalButton : css.buttonDisabled}
                        disabled={isSubmitting}
                        aria-disabled={!isFormReady}>
                        Зберегти
                    </button>
                    <button type="button" className={css.buttonCancel} onClick={handleCancel}>Відмінити</button>
                </div>

            </Form>
            </>  
            )}}
        </Formik>
    )
}

export default AddStoryForm