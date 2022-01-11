import { configureStore } from '@reduxjs/toolkit';
import markersSlice from './redux/markerSlice';

const store = configureStore({
  reducer: {
    maps: markersSlice,
  },
});

export default store;