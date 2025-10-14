# Native American Tours - Frontend Application

## Overview
This Vue.js 3 frontend application provides a user-friendly interface for browsing, selecting, and booking Native American tours. It supports various tour packages, date selection, add-on management, and integrated payment processing via Stripe. The project aims to deliver a modern, nature-inspired booking experience for cultural tours, leveraging a multi-tenant backend architecture. It features dynamic navigation, combination package support, and real-time pricing updates. The application adheres to a custom "Native Journey" design system to ensure a consistent and responsive user experience.

## Recent Changes (October 14, 2025)
- **CartItem Add-ons Display - COMPLETE**: Enhanced CartItem component to display add-ons with proper visibility:
  - **ADD-ONS Section**: Added dedicated section with dashed divider and uppercase header
  - **Subtotal Display**: Shows add-on subtotals (not prices) matching AddonsNew display
  - **Child Add-ons Hierarchy**: Displays child add-ons with indentation (↳) and lighter background
  - **Fees Consolidation**: All fees (tour + add-ons) combined in single "Taxes & Fees" row
  - **Visibility in Index & Checkout**: CartItem now properly displays add-ons in both Start/Index and Checkout pages
  - **Validation Logic**: Only shows add-ons with valid values using hasValidFieldValue() method
- **Add-ons Fee Calculation Fix - COMPLETE**: Corrected per-unit and per-pax fee calculation logic:
  - **Proper Per-Unit/Pax Fee Logic**: Now calculates fee for 1 unit/pax first, then multiplies by quantity
  - **Roundout for Decimal Precision**: All price, subtotal, and fee values rounded to 2 decimals
  - **Checkout Display Enhancement**: Add-ons in checkout now match AddonsNew display with child add-ons
- **Add-ons Persistence & Checkout Integration - COMPLETE**: Fixed critical bugs in add-ons data persistence and checkout display
- **Add-ons Validation & Persistence - COMPLETE**: Implemented comprehensive validation and state management for add-ons system

## User Preferences
None documented yet.

## System Architecture
The application is built with Vue.js 3 (Options API), Vuex for state management, Vue Router, and Axios for HTTP requests. It utilizes a custom "Native Journey" design system for a modern and consistent UI/UX, characterized by a specific color palette (Primary Teal #0D9488, Terracotta #E07856, Amber #F59E0B), typography, spacing, border-radius, and shadows. All UI components are designed to be 100% compliant with this system, ensuring responsiveness across all breakpoints.

**Key Architectural Decisions & Features:**
- **Dynamic Branding:** Header fetches tour operator logo and company name from an API endpoint with a fallback.
- **Progressive Step Navigation:** Features a multi-step booking process with dynamic and contiguous step IDs that adapt to booking type (single vs. combo) and add-on availability.
- **Combination Packages Support:** Fully supports multi-package bookings, including dedicated "MyTrip" and "Maps" pages for visualizing itineraries.
- **Modular Add-ons System:** A refactored add-ons system with 6 distinct input components, comprehensive validation (including parent/child relationships and conditional visibility), real-time pricing calculation (one-time, per-unit, per-pax fees), and persistence of selections.
- **Real-time Pricing:** Pricing breakdowns for tours and add-ons update immediately upon user selections.
- **Responsive Design:** Auto-fill responsive grids for tour browsing, 3-column layouts for scheduling, and mobile optimizations across all pages.
- **UI/UX Enhancements:** Custom calendar, booking summary badges, redesigned confirmation page with animated success states, and enhanced icon visibility.
- **API Integration:** Connects to an external, multi-tenant backend API, with dynamic baseURL configuration via Axios interceptors.

## External Dependencies
- **Stripe**: For secure payment processing (`VUE_APP_STRIPE_PUBLISHABLE_KEY`).
- **Google Maps**: For interactive map functionalities on the "Maps" page (`VUE_APP_MAP_KEY`).
- **External Backend API**: Provides all core data including tour information, availability, booking functionalities, dynamic branding assets, and payment processing endpoints. Configured via `VUE_APP_API_URL` and `VUE_APP_ASSET_URL`.