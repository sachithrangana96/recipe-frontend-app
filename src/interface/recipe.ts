export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  showDeleteIcon?: boolean; // New prop to control the icon
}

export interface FavoriteRecipeCardProps {
  recipe: FavoriteRecipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showDeleteIcon?: boolean; // New prop to control the icon
}

export interface Category {
  strCategory: string;
}

export interface FavoriteRecipe {
  recipeId: string;
  recipeName: string;
  recipeThumb: string;
  category: string;
}

export interface FavoriteResponse {
  message: string;
  favorite: FavoriteRecipe;
}


export interface FavoriteRecipe {
  recipeId: string;
  recipeName: string;
  recipeThumb: string;
  category: string;
}