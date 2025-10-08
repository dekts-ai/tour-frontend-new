# Native American Tours - Frontend Application

## Overview
This Vue.js 3 frontend application facilitates booking Native American tours. It offers a user-friendly interface for browsing tour packages, selecting dates, adding extras, and processing payments via Stripe. The project aims to provide a modern, nature-inspired booking experience for cultural tours, leveraging a multi-tenant backend architecture.

## Recent Changes (October 8, 2025)
- **Dynamic Branding**: Header now fetches tour operator logo and company name from `tour-operator-logo` API endpoint with fallback to default branding
- **Calendar Redesign**: Custom calendar component fully redesigned with Native Journey design tokens (teal gradient header, modern cells, enhanced legend)
- **Calendar Cell Improvements**: Removed inner borders, fixed overflow, improved color distinction (teal for available, amber for low booking)
- **Booking Summary Enhancement**: Added color-coded badges and description text below package name to fill empty space
- **Real-time Add-ons Pricing**: Implemented reactive pricing updates - add-ons now update totals immediately without refresh, only showing prices for actually selected add-ons (checked checkboxes, filled numbers > 0, selected radio/dropdowns)
- **Header Alignment Fix**: Consistent padding and alignment across all screen sizes (max-width: 1400px)
- **Additional Options Styling**: Added white background, padding, and shadows to match other sections
- **Checkout Layout Fix**: Resolved header overlap issue with proper margin adjustments for inner-content-section
- **Phone Dropdown UX**: Implemented click-outside handler to close country code dropdown when clicking outside the component
- **Proceed Button Icon Fix**: Enhanced icon visibility with explicit styling to ensure terracotta background and white icon are always visible

## User Preferences
None documented yet.

## System Architecture
The application is built with Vue.js 3 (Options API), Vuex for state management, Vue Router, and Axios for HTTP requests. It utilizes a custom "Native Journey" design system for a modern UI/UX, characterized by a specific color palette (Primary Teal #0D9488, Terracotta #E07856, Amber #F59E0B), typography, spacing, border-radius, and shadows. All UI components have been completely redesigned to be 100% compliant with this new design system, ensuring a consistent and responsive experience across all breakpoints. The header features dynamic branding fetched from the backend API. Key UI/UX decisions include a progress-based step navigation, auto-fill responsive grids for tour browsing, and a 3-column layout for scheduling and add-ons. Payment processing is integrated via Stripe, and Google Maps is used for location features. The application connects to an external, multi-tenant backend API, with the backend URL constructed using tenant IDs from URL parameters.

## External Dependencies
- **Stripe**: For payment processing (`VUE_APP_STRIPE_PUBLISHABLE_KEY`).
- **Google Maps**: For map functionalities (`VUE_APP_MAP_KEY`).
- **External Backend API**: Provides tour data, availability, booking, and payment processing endpoints. Configured via `VUE_APP_API_URL` and `VUE_APP_ASSET_URL`.