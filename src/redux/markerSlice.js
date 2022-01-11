import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
  currentMarker: null
};


export const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    addMarker: (state, action) => {
    state.history.push(action.payload);
    state.currentMarker = action.payload;
    },
    resetMarkers: (state) => {
      state.history = [];
    },
  },
});

export const { addMarker, resetMarkers } = markersSlice.actions;

export const selectCurrentMarker = (state) => state.maps.currentMarker;

export default markersSlice.reducer;