import React from 'react';
import KanbanBoard from "../../components/Kanban/KanbanBoard";
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function Home() {
  // Redux store'dan verileri almak için useSelector kullanıyoruz
  const lists = useSelector((state) => state.kanban.lists);

  return (
    <Container>
     
      <KanbanBoard lists={lists} />
    </Container>
  );
}

export default Home;
