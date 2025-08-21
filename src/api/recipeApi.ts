import type { Category, Recipe } from "../interface";
import { api } from "./apiClient";

export const getCategories = () => {
  return api.get<Category[]>("/recipes/categories");
};


export const getRecipesByCategory = (category: string) => {
  return api.get<Recipe[]>("/recipes/by-category", {
    params: { category }, // ✅ Axios will serialize it to ?category=Beef
  });
};



