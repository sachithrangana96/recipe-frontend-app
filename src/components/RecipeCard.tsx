
import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import type { RecipeCardProps } from '../interface';




const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onToggleFavorite, showDeleteIcon = false }) => {
  console.log("isFavorite",isFavorite)
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {recipe.strMeal}
        </Typography>
         <IconButton
            
            onClick={() => onToggleFavorite(recipe)}
            aria-label="toggle favorite"
          >
               {showDeleteIcon ? (
            <DeleteIcon color="action" />
          ) : isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon color="action" />
          )} 
          </IconButton>
           
      </CardContent>
      
    </Card>
  );
};

export default RecipeCard;