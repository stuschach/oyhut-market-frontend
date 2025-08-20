// API Wrapper with automatic fallback to static data
// This allows the app to work with or without a backend

let backendAvailable = null;
let backendCheckPromise = null;

// Check if backend is available
export const checkBackendAvailability = async () => {
  // Return cached result if we already checked
  if (backendAvailable !== null) return backendAvailable;
  
  // Return existing check if in progress
  if (backendCheckPromise) return backendCheckPromise;
  
  // If no API URL configured, immediately return false
  if (!import.meta.env.VITE_API_URL) {
    backendAvailable = false;
    return false;
  }
  
  // Start new check
  backendCheckPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000); // Quick timeout
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/health`, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      backendAvailable = response.ok;
    } catch (error) {
      console.log('Backend not available, running in static mode');
      backendAvailable = false;
    }
    
    backendCheckPromise = null;
    return backendAvailable;
  })();
  
  return backendCheckPromise;
};

// Don't check immediately - let components trigger it when needed

// Wrapper for API calls with fallback
export const apiCallWithFallback = async (apiCall, fallbackData) => {
  // If no API URL configured, use fallback immediately without checking
  if (!import.meta.env.VITE_API_URL) {
    console.log('No backend configured, using static data');
    
    // Execute fallback function if provided
    if (typeof fallbackData === 'function') {
      return await fallbackData();
    }
    
    // Return fallback data if provided
    if (fallbackData) {
      return fallbackData;
    }
    
    // Return empty but valid response structure
    return {
      data: [],
      success: false,
      offline: true
    };
  }
  
  // Check backend availability
  const isAvailable = await checkBackendAvailability();
  
  // If backend is not available, use fallback
  if (!isAvailable) {
    console.log('Backend offline, using static data');
    
    // Execute fallback function if provided
    if (typeof fallbackData === 'function') {
      return await fallbackData();
    }
    
    // Return fallback data if provided
    if (fallbackData) {
      return fallbackData;
    }
    
    // Return empty but valid response structure
    return {
      data: [],
      success: false,
      offline: true
    };
  }
  
  // Backend is available, try the API call
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.log('API call failed despite backend being available, using fallback');
    backendAvailable = false; // Mark backend as unavailable for future calls
    
    // Execute fallback function if provided
    if (typeof fallbackData === 'function') {
      return await fallbackData();
    }
    
    // Return fallback data if provided
    if (fallbackData) {
      return fallbackData;
    }
    
    // Return empty but valid response structure
    return {
      data: [],
      success: false,
      offline: true
    };
  }
};

// Load static JSON data
export const loadStaticData = async (dataFile) => {
  try {
    const response = await fetch(`/data/${dataFile}`);
    const data = await response.json();
    return { data, success: true, static: true };
  } catch (error) {
    console.error(`Failed to load static data: ${dataFile}`, error);
    return { data: [], success: false };
  }
};

// Check if we should show checkout features
export const isCheckoutAvailable = () => {
  return backendAvailable === true;
};

// Get appropriate message for unavailable features
export const getOfflineMessage = (feature) => {
  const messages = {
    checkout: "Online ordering coming soon! Please call (360) 555-1234 to place your order.",
    login: "Account features coming soon! Browse our products as a guest.",
    order: "Order tracking coming soon! Please call us for order status.",
    contact: "Please call us at (360) 555-1234 or email info@oyhutmarket.com",
    default: "This feature requires our online services. Please call (360) 555-1234."
  };
  
  return messages[feature] || messages.default;
};