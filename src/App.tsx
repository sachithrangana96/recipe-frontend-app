import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './routes/AppRouter'
import { Box, Button, Paper } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';


function App() {
  const navigate = useNavigate();



  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button variant="contained" onClick={() => navigate("/")}>
            Browse Recipes
          </Button>
          <Button variant="contained" onClick={() => navigate("/favorites")}>
            My Favorites
          </Button>
        </Paper>

        {/* Main Content */}
        <Box sx={{ mt: '80px', flex: 1, p: 2 }}>
           <AnimatePresence mode="wait">
                <AppRouter />
           </AnimatePresence>
        </Box>
      </Box>

    </>
  )
}

export default App
