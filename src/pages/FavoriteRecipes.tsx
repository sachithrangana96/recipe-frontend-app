import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import type { FavoriteRecipe, Recipe } from '../interface';
import { deleteFavorite, getFavorites } from '../api/favoriteApi';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import { motion } from 'framer-motion';





const FavoriteRecipes = () => {

  const [favorites, setFavorites] = React.useState<FavoriteRecipe[]>([]);
  const [loading, setIsLoading] = React.useState<boolean>(false);


  React.useEffect(() => {
    fetchFavoritesRecipes();
  }, [])



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

  const deleteFavoriteRecipe = async (recipeId: string): Promise<void> => {
    try {
      await deleteFavorite(recipeId);
      fetchFavoritesRecipes();
    } catch (err: any) {
      console.error('Error deleting recipes:', err);
    }
  };

  const toggleFavorite = async (recipe: FavoriteRecipe): Promise<void> => {
    await deleteFavoriteRecipe(recipe.recipeId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My Favorite Recipes
        </Typography>
      </Paper>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >

        {
         loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
        )
        }

        {      
        favorites.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            You don't have any favorite recipes yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((recipe) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.recipeId}>
                 <motion.div 
                      className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                <FavoriteRecipeCard
                  recipe={recipe}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(recipe)}
                  showDeleteIcon={true}
                />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default FavoriteRecipes;