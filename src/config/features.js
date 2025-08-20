// Feature flags configuration
// Set to true when backend is available, false for static deployment

const isDevelopment = import.meta.env.DEV;
const hasBackend = import.meta.env.VITE_API_URL ? true : false;

export const FEATURES = {
  // Authentication & User Management
  authentication: false,
  userRegistration: false,
  userProfile: false,
  
  // Order & Payment Processing
  checkout: false,
  payments: false,
  orderTracking: false,
  orderHistory: false,
  guestCheckout: false,
  
  // Dynamic Features
  realTimeInventory: false,
  contactForm: false,
  emailNotifications: false,
  
  // Cart Features
  persistentCart: false, // Server-side cart sync
  localCart: true, // LocalStorage cart always enabled
  
  // Admin Features
  adminPanel: false,
  productManagement: false,
  
  // API Features
  useRealAPI: false, // When false, uses mock data
  
  // UI Features (always enabled for display)
  productDisplay: true,
  categoryFiltering: true,
  searchFunctionality: true,
  bakeryDisplay: true,
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (featureName) => {
  return FEATURES[featureName] || false;
};

// Message to show when feature is disabled
export const getDisabledFeatureMessage = (featureName) => {
  const messages = {
    authentication: "Sign in is coming soon!",
    checkout: "Online ordering coming soon! Please call us to place an order.",
    payments: "Payment processing coming soon!",
    orderTracking: "Order tracking will be available soon.",
    contactForm: "Contact form coming soon! Please call us directly.",
    default: "This feature is coming soon!"
  };
  
  return messages[featureName] || messages.default;
};