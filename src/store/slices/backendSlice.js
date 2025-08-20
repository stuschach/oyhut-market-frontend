import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Check backend availability
export const checkBackend = createAsyncThunk(
  'backend/check',
  async () => {
    // Skip backend check if no API URL is configured
    // This prevents proxy errors when running in static mode
    if (!import.meta.env.VITE_API_URL) {
      console.log('No backend configured, running in static mode');
      return false;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/health`,
        { 
          method: 'GET',
          signal: controller.signal 
        }
      );
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Backend not available, running in static mode');
      return false;
    }
  }
);

const backendSlice = createSlice({
  name: 'backend',
  initialState: {
    isAvailable: null, // null = checking, true = available, false = not available
    isLoading: true,
    lastChecked: null,
  },
  reducers: {
    setBackendAvailable: (state, action) => {
      state.isAvailable = action.payload;
      state.lastChecked = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkBackend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBackend.fulfilled, (state, action) => {
        state.isAvailable = action.payload;
        state.isLoading = false;
        state.lastChecked = Date.now();
      })
      .addCase(checkBackend.rejected, (state) => {
        state.isAvailable = false;
        state.isLoading = false;
        state.lastChecked = Date.now();
      });
  },
});

export const { setBackendAvailable } = backendSlice.actions;
export default backendSlice.reducer;