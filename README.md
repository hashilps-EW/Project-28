# Shopping Cart Application

A responsive shopping cart application built with React 19, TypeScript, and modern frontend best practices.

## Project Overview

This is a full-featured e-commerce shopping cart application that allows users to browse products, search and filter items, manage their cart, and complete a checkout flow. The application demonstrates proficiency in React state management, API integration, form validation, and responsive design.

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management for cart
- **TanStack Query** - API data fetching and caching
- **Zod** - Schema validation
- **localStorage** - Cart persistence
- **pnpm** - Package manager

## API Used

- **DummyJSON Products API** - https://dummyjson.com/products
  - Provides product data including images, prices, categories, and ratings
  - API responses are validated using Zod schemas before use

## Features Completed

### Product Listing
- Display products in a responsive grid (1-4 columns based on screen size)
- Each product shows: image, title, category, price, rating, and "Add to Cart" button
- Loading state indicator
- API error handling with user-friendly messages
- Empty state handling

### Search and Filtering
- Search products by title
- Filter products by category
- Filter products by maximum price
- Clear all filters button
- Custom hook (`useProductFilters`) for filter logic

### Cart Management
- Add products to cart
- Remove products from cart
- Increase/decrease quantity (min: 1, max: 5)
- Clear cart
- Quantity buttons disabled when limits reached
- Cart item count displayed in navigation

### Cart Summary
- Displays all cart items with quantities
- Shows individual product totals
- Calculates subtotal
- Tax calculation (5% of subtotal)
- Discount (10% when subtotal > $100)
- Final total calculation
- Minimum checkout value enforcement ($10)
- Clear message when checkout is disabled

### Cart Persistence
- Cart data persisted to localStorage using Zustand's persist middleware
- Cart remains available after page refresh

### Checkout Flow
Three-step checkout process:
1. **Cart Review** - Shows selected items and price summary
2. **Shipping** - Form for shipping details with Zod validation
3. **Payment Summary** - Read-only display of shipping details, cart items, and final totals

Form validation includes:
- Full name (required)
- Email (valid format)
- Phone number (required)
- Address (required)
- City (required)
- Postal code (required)

### Additional Features
- Responsive design for mobile, tablet, and desktop
- Clear loading indicators
- Empty cart message
- Empty search result message
- Form validation messages displayed near relevant fields
- Consistent spacing, typography, and button styles
- Navigation between Products, Cart, and Checkout views

### Bonus Features Implemented
- **Product Sorting** - Sort by price (low/high), rating, or title (A-Z)
- **Skeleton Loading** - Animated placeholders while products load
- **Dark Mode** - Toggle between light and dark themes with persistence
- **Product Details View** - Click product title to view detailed information
- **Image Zoom** - Click any product image to view it in a zoomed modal
- **Basic Tests** - Unit tests for cart calculation functions using Vitest

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopping-cart
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Commands to Run the Project

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run linter
- `pnpm test` - Run unit tests

## Known Limitations

- Product images are loaded from external API; no local fallbacks
- No actual payment gateway integration (mock checkout only)
- No user authentication

## Deployment

The application can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages

To deploy:
1. Run `pnpm build` to create the production build
2. Deploy the `dist` folder to your chosen platform
3. Ensure the deployed application is publicly accessible

## Code Architecture

### State Management
- **Zustand** is used for cart state management with `persist` middleware for localStorage
- TanStack Query manages API data fetching, caching, and loading/error states
- Product data is NOT stored in Zustand (per requirements)

### Custom Hooks
- `useProducts` - Fetches and manages product data with TanStack Query
- `useProductFilters` - Manages search and filter logic

### Validation
- Zod schemas validate:
  - Product API responses
  - Shipping form data
- Validation errors are displayed near relevant fields

### Component Structure
- `ProductCard` - Individual product display
- `ProductFilters` - Search and filter controls
- `ProductList` - Product grid with filters
- `CartItem` - Individual cart item with quantity controls
- `CartSummary` - Price calculations and totals
- `Cart` - Full cart view
- `CheckoutReview` - Step 1 of checkout
- `CheckoutShipping` - Step 2 of checkout with form validation
- `CheckoutPayment` - Step 3 of checkout (read-only summary)
- `Checkout` - Checkout flow orchestration
- `App` - Main application with navigation

## Cart Calculation Logic

- **Subtotal**: Sum of (product price × quantity) for all items
- **Tax**: 5% of subtotal
- **Discount**: 10% of subtotal when subtotal > $100
- **Total**: Subtotal + Tax - Discount
- **Minimum checkout**: $10 (checkout disabled below this threshold)

## Understanding the Implementation

### How Product Fetching Works
Products are fetched from the DummyJSON API using TanStack Query's `useQuery` hook. The API response is validated against a Zod schema before being used in the application, ensuring type safety and data integrity.

### Why TanStack Query is Used
TanStack Query provides:
- Automatic caching and refetching
- Loading and error state management
- Background refetching and stale-while-revalidate
- Optimistic updates
- Built-in request deduplication
This separates data fetching concerns from UI state management.

### How the Zustand Store Works
The cart store uses Zustand with the persist middleware. It stores cart items (product + quantity) and provides actions for:
- Adding items (with quantity limit of 5)
- Removing items
- Increasing/decreasing quantity (min: 1, max: 5)
- Clearing the cart
- Calculating totals
The persist middleware automatically syncs the cart state to localStorage.

### How Cart Persistence Works
Zustand's persist middleware is configured with the name 'cart-storage'. It automatically saves the cart state to localStorage whenever it changes and restores it on page load, ensuring the cart persists across sessions.

### How Cart Totals are Calculated
The `getCartTotal` function iterates through all cart items and sums the product of each item's price and quantity. Tax, discount, and final totals are calculated in the display components based on this subtotal.

### How Zod Validation Works
Zod schemas define the expected shape of data. When validating:
- API responses are parsed against the product schema before use
- Form data is validated on submission using `safeParse`
- Validation errors are extracted and displayed near relevant fields
- Type inference ensures TypeScript types match the schema

### How Loading and Error States are Handled
TanStack Query provides `isLoading`, `error`, and `data` states. The ProductList component:
- Shows skeleton loading placeholders when `isLoading` is true
- Displays an error message when `error` is present
- Shows an empty state when no products are available
- Displays filtered products when data is loaded

### Why Components and Hooks Were Separated
Separation improves:
- **Reusability** - Hooks can be used in multiple components
- **Testability** - Logic can be tested independently of UI
- **Readability** - Clear separation of concerns
- **Maintainability** - Easier to modify logic without affecting UI

### Potential Improvements with More Time
- Add product pagination
- Implement more sophisticated filtering (price range slider)
- Add wishlist functionality
- Implement order history
- Add review/rating system
- Add user authentication
- Integrate real payment gateway
- Add product comparison feature
- Implement advanced search with filters
- Add analytics tracking
