import { createSelector } from 'reselect';

import { CategoriesState } from './categories.reducer';

import { CategoriesMap } from './categories.types';

const selectCategoryReducer = (state): CategoriesState => state.categories;



export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoriesMap => { 
    return categories.reduce(
      (acc, { title, items }) => {
        acc[title.toLowerCase()] = items;
      return acc;
    },{} as CategoriesMap)
  }
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)