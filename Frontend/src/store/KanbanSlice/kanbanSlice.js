import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [
    {
      id: '1',
      title: 'Yapılacaklar',
      cards: [
        { id: '1', title: 'Proje planlaması', description: '' },
        { id: '2', title: 'Toplantı başlatma', description: '' },
        { id: '3', title: 'Dokümantasyon hazırlama', description: '' },
        { id: '4', title: 'Tasarım incelemesi', description: '' },
        { id: '5', title: 'Kod gözden geçirme', description: '' },
      ],
    },
    {
      id: '2',
      title: 'Yapılıyor',
      cards: [
        { id: '6', title: 'Backend geliştirme', description: '' },
        { id: '7', title: 'Frontend entegrasyonu', description: '' },
      ],
    },
    {
      id: '3',
      title: 'Bitti',
      cards: [
        { id: '8', title: 'Prototip oluşturma', description: '' },
        { id: '9', title: 'Veritabanı tasarımı', description: '' },
      ],
    },
    {
      id: '4',
      title: 'Test Ediliyor',
      cards: [
        { id: '10', title: 'Birim testleri yazma', description: '' },
        { id: '11', title: 'Entegrasyon testleri', description: '' },
      ],
    },
  ],
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { listId, title, description } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      const newCard = {
        id: (Math.random() * 10000).toFixed(0), // Random ID for simplicity
        title,
        description,
    
      };
      if (list) {
        list.cards.push(newCard);
      }
    },
    moveCard: (state, action) => {
      const { source, destination } = action.payload;
      const sourceListIndex = state.lists.findIndex(list => list.id === source.droppableId);
      const destinationListIndex = state.lists.findIndex(list => list.id === destination.droppableId);
      const [movedCard] = state.lists[sourceListIndex].cards.splice(source.index, 1);
      state.lists[destinationListIndex].cards.splice(destination.index, 0, movedCard);
    },
    updateCard: (state, action) => {
      const { cardId, title, description } = action.payload;
      state.lists.forEach(list => {
        const card = list.cards.find(card => card.id === cardId);
        if (card) {
          card.title = title;
          card.description = description;
        }
      });
    },
  },
});

export const { addCard, moveCard, updateCard } = kanbanSlice.actions;
export default kanbanSlice.reducer;
