"use client"

import dynamic from "next/dynamic"

const Select = dynamic(
    () => import("react-select"),
    {
        ssr: false
    }
) as typeof import("react-select").default

export default Select