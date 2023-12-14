/* eslint-disable */

'use client'

/* prettier-ignore */ import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IContextType {
  categoryFilters: string[]
  /* prettier-ignore */ setCategoryFilters: React.Dispatch<SetStateAction<string[]>>
  sort: string
  /* prettier-ignore */ setSort: React.Dispatch<SetStateAction<string>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  sort: '',
  setSort: () => '',
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA)

/* prettier-ignore */ export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState([])
  const [sort, setSort] = useState('-createdAt')

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)

/*eslint-enable */
