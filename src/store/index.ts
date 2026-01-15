import { configureStore } from '@reduxjs/toolkit';
import facilitiesReducer from '@/features/facilities/types/facility.slice';

// configure global redux store
export const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
