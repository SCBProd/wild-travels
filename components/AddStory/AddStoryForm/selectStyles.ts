import type { StylesConfig } from "react-select"

export type CategoryOption = {
    value: string;
    label: string;
}

export const selectStyles: StylesConfig<CategoryOption, false> = {
    control: (base, state) => {
        const isInvalid = Boolean(state.selectProps['aria-invalid'])

        return {
            ...base,
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isInvalid
                ? 'var(--color-red)'
                : state.isFocused
                    ? 'var(--color-mantis-light)'
                    : '#1b391b26',
            boxShadow: 'none',
            borderBottomLeftRadius: state.selectProps.menuIsOpen ? 0 : base.borderBottomLeftRadius,
            borderBottomRightRadius: state.selectProps.menuIsOpen ? 0 : base.borderBottomRightRadius,
            '&:hover': {
                borderColor: isInvalid ? 'var(--color-red)' : 'var(--color-mantis-light)',
            },
        }
    },
    menu: (base) => ({
        ...base,
        backgroundColor: 'var(--color-scheme-2-background)',
        boxShadow: 'none',
        overflow: 'visible',
        marginTop: 0,
        border: '1px solid var(--color-mantis-light)',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        '&:hover': {
            borderColor: 'var(--color-mantis-light)',
        },
    }),
    menuList: (base) => ({
        ...base,
        backgroundColor: 'var(--color-scheme-2-background)',
        maxHeight: 'none',
        overflowY: 'visible',
        padding: '16px',
    }),
    option: (base, state) => ({
        ...base,
        cursor: 'pointer',
        backgroundColor: state.isFocused
            ? 'var(--color-neutral-lightest)'
            : 'transparent',
        color: '#1b391b',
        
    }),
    placeholder: (base, state) => ({
        ...base,
        color: state.selectProps['aria-invalid'] ? 'var(--color-red)' : base.color,
    }),
    singleValue: (base, state) => ({
        ...base,
        color: state.selectProps['aria-invalid'] ? 'var(--color-red)' : base.color,
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        cursor: 'pointer',
        color: 'var(--opacity-neutral-darkest-60)',
        transition: 'transform 0.2s ease',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
}