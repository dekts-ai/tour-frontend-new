# Native American Tours - Frontend Application

## Overview
This Vue.js 3 frontend application facilitates booking Native American tours. It offers a user-friendly interface for browsing tour packages, selecting dates, adding extras, and processing payments via Stripe. The project aims to provide a modern, nature-inspired booking experience for cultural tours, leveraging a multi-tenant backend architecture.

## User Preferences
None documented yet.

## System Architecture
The application is built with Vue.js 3 (Options API), Vuex for state management, Vue Router, and Axios for HTTP requests. It utilizes a custom "Native Journey" design system for a modern UI/UX, characterized by a specific color palette (Primary Teal, Terracotta, Amber), typography, spacing, border-radius, and shadows. All UI components have been completely redesigned to be 100% compliant with this new design system, ensuring a consistent and responsive experience across all breakpoints. Key UI/UX decisions include a progress-based step navigation, auto-fill responsive grids for tour browsing, and a 3-column layout for scheduling and add-ons. Payment processing is integrated via Stripe, and Google Maps is used for location features. The application connects to an external, multi-tenant backend API, with the backend URL constructed using tenant IDs from URL parameters.

## External Dependencies
- **Stripe**: For payment processing (`VUE_APP_STRIPE_PUBLISHABLE_KEY`).
- **Google Maps**: For map functionalities (`VUE_APP_MAP_KEY`).
- **External Backend API**: Provides tour data, availability, booking, and payment processing endpoints. Configured via `VUE_APP_API_URL` and `VUE_APP_ASSET_URL`.