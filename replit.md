# Native American Tours - Frontend Application

## Overview
This Vue.js 3 frontend application facilitates booking Native American tours. It offers a user-friendly interface for browsing tour packages, selecting dates, adding extras, and processing payments via Stripe. The project aims to provide a modern, nature-inspired booking experience for cultural tours, leveraging a multi-tenant backend architecture.

## Recent Changes (October 14, 2025)
- **Add-ons Persistence & Checkout Integration - COMPLETE**: Fixed critical bugs in add-ons data persistence and checkout display:
  - **Custom Fields with Child Values**: Enhanced buildCustomFields() to properly save child field values alongside parent fields
    - Parent fields save with their values and pricing info
    - Child fields now stored in nested `children` array with values/repeated values
    - restoreCustomFields() now properly restores both parent and child field values when editing packages
  - **Checkout Add-ons Display**: Fixed missing add-on pricing in checkout summary
    - Now saves `addons_total` (subtotal of all add-ons) to cart item
    - Now saves `addons_fee` (fees for all add-ons) to cart item
    - Checkout ItemizedList displays add-on breakdown and includes fees in totals
  - **Total Calculation Fix**: Corrected total calculation to prevent double-counting
    - Base `item.total` remains tour subtotal + tour fees
    - Checkout adds `addons_total` and `addons_fee` separately for correct grand total
- **Add-ons Validation & Persistence - COMPLETE**: Implemented comprehensive validation and state management for add-ons system:
  - **Required Field Validation**: Full validation for required add-ons with parent/child relationship checking
    - If parent is required and selected, children must be filled when conditional rules are met
    - Detailed error messages for repeated fields: "Field is required for Person 1" / "Unit 2"
    - Inline error display with Native Journey design (no popup modals)
    - Smooth scroll to first error field when validation fails
    - **Fixed Critical Reactivity Issue**: Moved `errors` and `display_errors` from data() to setup() as reactive/ref for proper Vue 3 reactivity
    - **Fixed Prop Binding**: Changed `:display-errors` (kebab-case) to `v-bind:display_errors` to match underscore prop names in child components
  - **Custom Fields Persistence**: Selected add-ons saved to `custom_fields` structure for cart items
    - Auto-save on navigation: buildCustomFields() creates structured object with id, name, type, value, priceInfo
    - Auto-restore on return: restoreCustomFields() retrieves saved selections when editing from cart
    - Includes repeated child values for Price per pax/unit fields
    - Maintains pricing information (price, subtotal, fee) for checkout display
  - **Navigation Integration**: "Add Extras" step dynamically appears/hides based on addon availability
    - AddonsNew sets hasCustomFields in Vuex when addon form loads (true if fields exist, false otherwise)
    - Correctly appears in both combo and single package flows when add-ons are available
    - All edge cases handled: success with fields, success without form, and error states
  - **Visibility Filtering**: Only shows add-ons with visibility type "Both" or "Frontend", hides "Backend" type fields
    - Fixed empty field-card containers by moving visibility check to wrap entire card div
    - Validation skips backend fields to prevent false validation failures
  - All validation errors use consistent key format (`fieldId-index`) matching template bindings for proper error display

## Recent Changes (October 13, 2025)
- **Complete Native Journey Design Compliance for Add-ons System**: Finalized 100% Native Journey design implementation across all add-on components:
  - **All 6 Input Components Redesigned**: NumberInput, TextInput, TextboxInput, CheckboxInput, RadioInput, DropdownInput now feature:
    - Consistent 2px borders with var(--neutral-200), teal focus states with 3px glow (rgba(13, 148, 136, 0.1))
    - Hover effects with background: var(--neutral-50) and border: var(--neutral-300)
    - Custom checkbox/radio designs with teal gradient fills and smooth check animations
    - Proper icon integration with SVG icons positioned inline
    - Error states with red borders and error messages with warning icons
    - All transitions using var(--transition-base) for smooth interactions
  - **AddonsNew.vue Parent Component Styling**:
    - Field cards with gradient left border accents (teal gradient, opacity 0 → 1 on hover)
    - Hover states with border color change, shadow elevation (var(--shadow-md)), and translateY(-1px) transform
    - Price tags with amber gradient backgrounds (var(--accent-amber) to var(--accent-amber-dark))
    - Total cost summary with teal gradient background and white text
    - Continue button with amber gradient, hover transform, and shadow enhancement
  - **Responsive Breakpoints**: Media queries at 1024px (tablet: 2-col → 1-col grid) and 768px (mobile: reduced spacing)
  - **Design System Compliance**: All components use CSS custom properties from design-system.css (--primary-teal, --accent-amber, --neutral-*, --space-*, --radius-*, --shadow-*)
- **Modular Add-ons System Refactor**: Completely rebuilt add-ons with proper fee calculation and Native Journey design:
  - Created 6 input components (NumberInput, TextInput, TextboxInput, CheckboxInput, RadioInput, DropdownInput) with Native Journey styling
  - Rebuilt `AddonsNew.vue` with correct pricing logic:
    - Value structure: Each field stores { value, price, subtotal, fee, isRepeated, values[] }
    - Fee calculation: Per-unit/pax fees calculated first, then aggregated (fee = subtotal × commission_rate, mathematically equivalent to sum of per-unit fees)
    - Fixed grand total calculation to prevent double-counting (cart subtotal + addon subtotal + all fees)
  - **Repeated Child Fields**:
    - Price per pax: Children repeat based on totalPeople (from cart people_group), each person gets separate input
    - Price per unit: Children repeat based on parent number field value, each unit gets separate input
  - Conditional field visibility with operators: checked, equals, !=, >, <, >=, <=
  - Real-time pricing with itemized add-ons breakdown in booking summary
  - API integration: `/package/get-addon-form/{packageId}` with graceful error handling
  - Three pricing types: One time (fixed), Price per unit (quantity × price), Price per pax (passengers × price)
  - Native Journey design: Field cards, nested children styling, teal accents, amber price tags, responsive layout

## Previous Changes (October 10, 2025)
- **Axios BaseURL Fix**: Fixed critical blank page issue by adding axios request interceptor that dynamically sets baseURL from Vuex store with fallback to localStorage/URL parameters. This ensures API calls work correctly during navigation even before App.vue completes initialization.
- **Tab Computation Fix**: Corrected MyTrip and Maps components to properly compute tab/step numbers by checking both comboIds and hasCustomFields state, ensuring accurate navigation highlighting for all flow types.
- **Combination Packages Support**: Implemented full support for multi-package bookings using `cids` URL parameter (comma-separated package IDs). Added MyTrip and Maps pages to combination package flow with complete Native Journey redesign - modern card-based timeline, interactive map visualization, teal gradients, amber accents, responsive design with icons and shadows.
- **Corrected Dynamic Navigation**: Navigation now adapts to BOTH booking type (single vs combo) AND company configuration (with/without add-ons):
  - Single package flow: Browse(1) → Schedule(2) → Add Extras(3) → Checkout(4) (or 3 steps without add-ons)
  - Combination package flow: Browse(1) → Schedule(2) → Add Extras(3) → MyTrip(4) → Maps(5) → Checkout(6) (or 5 steps without add-ons)
  - All step IDs are truly dynamic and contiguous, computed from both `comboIds` and `hasCustomFields` state
  - All flows correctly start at Browse Tours, with MyTrip and Maps appearing AFTER Add Extras for combination packages
- **Smart Navigation Logic**: All components use computed tabs based on booking type and add-on availability for accurate step highlighting; navigation guards prevent accessing MyTrip/Maps with less than 2 packages in cart
- **Continue Button Flow**: Added Continue buttons to MyTrip and Maps pages with amber gradient styling:
  - Add Extras routes to MyTrip (combo) or Checkout (single)
  - MyTrip has Continue to Maps button
  - Maps has Continue to Checkout button
  - Schedule routes to MyTrip (combo without add-ons) or Checkout (single without add-ons) or Add Extras (when available)
- **MyTrip Page Redesign**: Modern collapsible date sections with package timeline cards, time indicators, guest details, package images with type badges, edit functionality, and Continue to Maps button - fully responsive with Native Journey design system
- **Maps Page Redesign**: Interactive Google Maps with custom styled markers, elegant tour details cards showing itinerary, date/time badges, descriptions, and Continue to Checkout button - clean layout with teal/amber color scheme
- **Pricing Breakdown Real-time Display**: Tour form now shows pricing breakdown (subtotal, taxes & fees, total) immediately when customers select rate groups or adjust guest counts, not just on continue button click
- **Duplicate Fees Fix**: Resolved issue where add-on fees were being calculated and displayed twice in checkout - fees now correctly calculated only for actually selected add-ons (checkbox checked, number > 0, radio/select chosen)
- **Consistent Add-ons Validation**: Applied hasValidFieldValue() logic across both Addons and Checkout components to ensure pricing consistency
- **Thank You Page Redesign**: Complete redesign of booking confirmation page with Native Journey design system - features animated success header with teal gradient checkmark, modern customer info cards with icons, clean booking summary cards, responsive guests table, elegant pricing breakdown, and amber gradient help section. Fully responsive with mobile optimizations.

## Previous Changes (October 8, 2025)
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