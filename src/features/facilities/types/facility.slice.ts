import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Facility } from './facility.types';
import {
  fetchFacilitiesApi,
  createFacilityApi,
  updateFacilityApi,
  deleteFacilityApi,
} from './facility.api';

type FacilityState = {
  list: Facility[];
  loading: boolean;
  error?: string | null;
};

const initialState: FacilityState = {
  list: [],
  loading: false,
  error: null,
};

//fectch all facilities
export const fetchFacilities = createAsyncThunk(
  'facilities/fetch',
  fetchFacilitiesApi
);

//create or update a facility
export const saveFacility = createAsyncThunk(
  'facilities/save',
  async (data: Facility) => {
    if (data.id) {
      return updateFacilityApi(data);
    }

    return createFacilityApi(data);
  }
);

//delete a facility by id
export const removeFacility = createAsyncThunk(
  'facilities/remove',
  async (id: string) => {
    await deleteFacilityApi(id);
    return id;
  }
);



const facilitySlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch facilities
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchFacilities.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load facilities';
      })

      // create or update facility
      .addCase(saveFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFacility.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveFacility.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to save facility';
      })

      // Delete facility
      .addCase(removeFacility.fulfilled, (state, action) => {
        state.list = state.list.filter(
          facility => facility.id !== action.payload
        );
      });
  },
});

export default facilitySlice.reducer;
