import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('bakeryCart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const bakeryCartSlice = createSlice({
  name: 'bakeryCart',
  initialState: loadState() || {
    items: [],
    isOpen: false,
  },
  reducers: {
    addBakeryItem: (state, action) => {
      const { product, quantity, size, flavor, customizations, specialInstructions, pickupDate, pickupTime } = action.payload;
      
      // Create unique ID for customized items
      const itemId = `${product._id}-${size?.name || 'default'}-${flavor || 'default'}-${JSON.stringify(customizations || {})}`;
      
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
      } else {
        // Calculate price based on customizations
        let unitPrice = product.basePrice;
        if (size) {
          const sizeOption = product.sizes?.find(s => s.name === size);
          if (sizeOption) {
            unitPrice = sizeOption.price;
          }
        }
        
        // Add customization costs if needed
        if (customizations && Array.isArray(customizations)) {
          customizations.forEach(custom => {
            if (custom.priceModifier) {
              unitPrice += custom.priceModifier;
            }
          });
        }
        
        state.items.push({
          id: itemId,
          productId: product._id,
          productName: product.name,
          quantity,
          size: size ? { name: size } : null,
          flavor,
          customizations,
          specialInstructions,
          unitPrice,
          totalPrice: unitPrice * quantity,
          image: product.images?.[0]?.url || 'https://via.placeholder.com/100',
          requiresAdvanceOrder: product.requiresAdvanceOrder,
          advanceOrderTime: product.advanceOrderTime,
          pickupDate,
          pickupTime,
          allergens: product.allergens,
          category: product.category
        });
      }
    },
    updateBakeryItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.unitPrice * quantity;
      }
    },
    removeBakeryItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearBakeryCart: (state) => {
      state.items = [];
    },
    toggleBakeryCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openBakeryCart: (state) => {
      state.isOpen = true;
    },
    closeBakeryCart: (state) => {
      state.isOpen = false;
    }
  }
});

export const {
  addBakeryItem,
  updateBakeryItem,
  removeBakeryItem,
  clearBakeryCart,
  toggleBakeryCart,
  openBakeryCart,
  closeBakeryCart
} = bakeryCartSlice.actions;

export const selectBakeryCartItemsCount = (state) => 
  state.bakeryCart.items.reduce((total, item) => total + item.quantity, 0);

export const selectBakeryCartTotal = (state) =>
  state.bakeryCart.items.reduce((total, item) => total + item.totalPrice, 0);

export default bakeryCartSlice.reducer;