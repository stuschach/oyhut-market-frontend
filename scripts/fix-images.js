// Script to replace all image URLs with placehold.co URLs
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/data/bakery-products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Map of product types to appropriate placeholder images
const imageMap = {
  'Cinnamon Rolls': 'https://placehold.co/600x400/8B4513/FFF?text=Cinnamon+Rolls',
  'Blueberry Muffins': 'https://placehold.co/600x400/4169E1/FFF?text=Blueberry+Muffins',
  'Triple Chocolate Chip Cookies': 'https://placehold.co/600x400/654321/FFF?text=Chocolate+Cookies',
  'Eclairs': 'https://placehold.co/600x400/D2691E/FFF?text=Eclairs',
  'Whoopie Pies': 'https://placehold.co/600x400/3E2723/FFF?text=Whoopie+Pies',
  'Peanut Butter Cup Brownies': 'https://placehold.co/600x400/3E2723/FFF?text=PB+Brownies',
  'Seahawks Cupcakes': 'https://placehold.co/600x400/002244/69BE28?text=Seahawks',
  'Mermaid Cupcakes': 'https://placehold.co/600x400/40E0D0/FFF?text=Mermaid',
  'Flower Cupcakes': 'https://placehold.co/600x400/FFB6C1/FFF?text=Flower+Cupcakes',
  'Apple Pie': 'https://placehold.co/600x400/8B4513/FFF?text=Apple+Pie',
  'French Apple Pie': 'https://placehold.co/600x400/A0522D/FFF?text=French+Apple',
  'Blueberry Pie': 'https://placehold.co/600x400/4169E1/FFF?text=Blueberry+Pie',
  'Blackberry Pie': 'https://placehold.co/600x400/2F1B8D/FFF?text=Blackberry+Pie',
  'Cherry Pie': 'https://placehold.co/600x400/DC143C/FFF?text=Cherry+Pie',
  'Raspberry Pie': 'https://placehold.co/600x400/E30B5C/FFF?text=Raspberry+Pie',
  'Strawberry Pie': 'https://placehold.co/600x400/FC5A8D/FFF?text=Strawberry+Pie',
  'Peach Pie': 'https://placehold.co/600x400/FFDAB9/333?text=Peach+Pie',
  'Pumpkin Pie': 'https://placehold.co/600x400/FF7518/FFF?text=Pumpkin+Pie',
  'Pecan Pie': 'https://placehold.co/600x400/8B4513/FFF?text=Pecan+Pie',
  'Pumpkin Pecan Pie': 'https://placehold.co/600x400/D2691E/FFF?text=Pumpkin+Pecan',
  'Custom Buttercream Cake': 'https://placehold.co/600x400/FFB6C1/333?text=Custom+Cake',
  'Custom Fondant Cake': 'https://placehold.co/600x400/E6E6FA/333?text=Fondant+Cake',
  'Wedding Cake': 'https://placehold.co/600x400/FFFFFF/C0C0C0?text=Wedding+Cake',
  'Birthday Cake': 'https://placehold.co/600x400/FF69B4/FFF?text=Birthday+Cake',
  'Seasonal Sugar Cookies': 'https://placehold.co/600x400/FFA500/FFF?text=Sugar+Cookies'
};

// Update product images
data.products.forEach(product => {
  if (imageMap[product.name]) {
    product.image = imageMap[product.name];
  } else {
    // Default fallback
    product.image = `https://placehold.co/600x400/8B7355/FFF?text=${encodeURIComponent(product.name.replace(/ /g, '+'))}`;
  }
});

// Update category images
const categoryImages = {
  'Custom Cakes': 'https://placehold.co/400x300/FFB6C1/333?text=Custom+Cakes',
  'Pies': 'https://placehold.co/400x300/8B4513/FFF?text=Pies',
  'Pastries': 'https://placehold.co/400x300/D2691E/FFF?text=Pastries',
  'Cookies': 'https://placehold.co/400x300/654321/FFF?text=Cookies',
  'Cupcakes': 'https://placehold.co/400x300/FF69B4/FFF?text=Cupcakes',
  'Muffins': 'https://placehold.co/400x300/4169E1/FFF?text=Muffins',
  'Brownies': 'https://placehold.co/400x300/3E2723/FFF?text=Brownies'
};

data.categories.forEach(category => {
  if (categoryImages[category.name]) {
    category.image = categoryImages[category.name];
  } else {
    category.image = `https://placehold.co/400x300/8B7355/FFF?text=${encodeURIComponent(category.name.replace(/ /g, '+'))}`;
  }
});

// Write the updated data back
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('✅ Updated all image URLs to use placehold.co');