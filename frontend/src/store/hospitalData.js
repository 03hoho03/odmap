import { createSlice } from '@reduxjs/toolkit';
import { fetchHospital } from './thunkFunction/hospitalThunkFunction';

const initialState = {
  fetchedHospitalData: [],
  filteredHospitalData: [],
  isLoading: false,
  mapInstance: {
    selectedHospitalItem: null,
    toggled: false
  },
  position: null,
  error: ''
};

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    filtered (state, action) {
      state.filteredHospitalData = (action.payload);
    },
    selected (state, action) {
      state.mapInstance.selectedHospitalItem = (action.payload);
    },
    findPosition (state, action) {
      state.position = action.payload;
    },
    toggled (state, action) {
      state.mapInstance.toggled = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospital.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHospital.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchedHospitalData = action.payload;
      })
      .addCase(fetchHospital.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload;
      });
  }
});

export const { filtered, selected, findPosition, toggled } = hospitalSlice.actions;
export default hospitalSlice.reducer;
