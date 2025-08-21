// src/api/favoriteApi.ts
import type { FavoriteRecipe, FavoriteResponse } from "../interface";
import { api } from "./apiClient";



export const addFavorites = (data: FavoriteRecipe) => {
  return api.post<FavoriteResponse, FavoriteRecipe>("/favorites", data);
};

export const getFavorites = () => {
  return api.get<FavoriteRecipe[]>("/favorites");
};

export const deleteFavorite = (recipeId: string) => {
  return api.delete<string>(`/favorites/${recipeId}`);
};
