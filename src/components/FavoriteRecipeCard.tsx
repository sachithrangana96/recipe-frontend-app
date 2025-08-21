
import * as React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import type { FavoriteRecipeCardProps } from '../interface';




const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({ recipe, onToggleFavorite, showDeleteIcon = false }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={recipe?.recipeThumb}
        alt={recipe?.recipeName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {recipe?.recipeName}
        </Typography>
          <IconButton
         onClick={() => onToggleFavorite()}
        aria-label="toggle favorite"
      >
        {showDeleteIcon && (
          <DeleteIcon color="action" />
        ) }
      </IconButton>
      </CardContent>
    </Card>
  );
};

export default FavoriteRecipeCard;