import * as React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '../components/RecipeCard';
import type { Category, FavoriteRecipe, Recipe } from '../interface';
import { getCategories, getRecipesByCategory } from '../api/recipeApi';
import { addFavorites, getFavorites } from '../api/favoriteApi';
import { motion, type Variants } from 'framer-motion';



// The main application component for the recipe browser.
export default function App() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [favorites, setFavorites] = React.useState<FavoriteRecipe[]>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);





  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await getCategories();
      const data = await response;
      setCategories(data as Category[]);
      if (data && data.length > 0) {
        setSelectedCategory(data[0]?.strCategory);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    }
  };

  const fetchRecipes = async (category: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRecipesByCategory(category);
      const data = await response;
      setRecipes(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (recipe: Recipe): Promise<void> => {
    try {
      const response = await addFavorites({
        recipeId: recipe?.idMeal!,
        recipeName: recipe?.strMeal!,
        recipeThumb: recipe?.strMealThumb!,
        category: selectedCategory,
      });

      console.log("Favorite added:", response);
    } catch (e) {
      console.error("Error adding favorite:", e);
    }
  };



  const fetchFavoritesRecipes = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await getFavorites();
      const data = await response;
      setFavorites(data);
    } catch (err: any) {
      console.error('Error fetching recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };





  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (selectedCategory) {
      fetchRecipes(selectedCategory);
      fetchFavoritesRecipes();
    }
  }, [selectedCategory,toggle]);

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

 const toggleFavorite = async (recipe: Recipe): Promise<void> => {
    const isFavorite = favorites.some((fav) => fav.recipeId === recipe.idMeal);
    setToggle(!toggle);
    if (!isFavorite) {
      await addFavorite(recipe);
      
    }
  };

  // Filter recipes based on the search term.
  const filteredRecipes = React.useMemo(() => {
    if (!searchTerm) {
      return recipes;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return recipes.filter(
      (recipe) => recipe.strMeal.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [recipes, searchTerm]);



  const isRecipeFavorite = (recipe: Recipe): boolean => {
    return favorites.some((fav) => fav.recipeId === recipe.idMeal);
  };

 const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    transition: {
      ease: "easeInOut",
    },
  },
};

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <TextField
            fullWidth
            label="Search for a recipe..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600, borderRadius: 1, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          />
        </Box>

        {/* Categories at the top */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, my: 2 }}>
          {categories.map((category) => (
            <Button
              key={category.strCategory}
              variant={selectedCategory === category.strCategory ? 'contained' : 'outlined'}
              onClick={() => handleCategorySelect(category.strCategory)}
              startIcon={<FastfoodIcon />}
              sx={{ borderRadius: 2 }}
            >
              {category.strCategory}
            </Button>
          ))}
        </Box>
      </Paper>

      <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh', overflow: 'auto' }}>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {/* This Box ensures a consistent height for the content area */}
        <Box sx={{ minHeight: 'calc(100vh - 150px)' }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.idMeal}>
                    <motion.div 
                      className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                    <RecipeCard
                      recipe={recipe}
                      isFavorite={isRecipeFavorite(recipe)}
                      onToggleFavorite={toggleFavorite}
                    />
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <Typography variant="body1" align="center">
                    No recipes found for this category or search term.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
    </motion.div>
  );
}
