import React from 'react';
import KanbanBoard from "../../components/Kanban/KanbanBoard";
import { Container, Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  const lists = useSelector((state) => state.kanban.lists);
  const { isAuthenticated } = useSelector((state) => state.auth);


  return (
    <Container>
      {isAuthenticated ? (
        <KanbanBoard lists={lists} />
      ) : (
        <Box sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="h2" align="center" gutterBottom>
            Lütfen giriş yapın
          </Typography>
          <Link to={"/login"} >
            <Button sx={{marginTop: 5,}} variant="contained" color="primary" >
              Giriş Yap
            </Button>
          </Link >
        </Box>
      )}
    </Container>
  );
}

export default Home;
