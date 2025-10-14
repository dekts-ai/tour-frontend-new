# Native American Tours - Frontend Application

## Overview
This Vue.js 3 frontend application provides a user-friendly interface for browsing, selecting, and booking Native American tours. It supports various tour packages, date selection, add-on management, and integrated payment processing via Stripe. The project aims to deliver a modern, nature-inspired booking experience for cultural tours, leveraging a multi-tenant backend architecture. It features dynamic navigation, combination package support, and real-time pricing updates. The application adheres to a custom "Native Journey" design system to ensure a consistent and responsive user experience.

## Recent Changes (October 14, 2025)
- **Dropdown/Radio Option-Based Pricing Fix - COMPLETE**: Fixed missing addons when pricing is stored in dropdown/radio options:
  - **Root Cause**: Field-level `additional_fee` was 0 for dropdown/radio, but pricing exists in selected options
  - **buildCustomFields Fix**: Now checks `field.additional_fee || entry.price > 0 || entry.subtotal > 0` to enable priceInfo
  - **Child Fields**: Applied same logic to child dropdown/radio fields for nested option-based pricing
  - **Pricing Detection**: Properly identifies option-based pricing by checking calculated entry values
  - **Display Result**: Dropdown/radio addons with priced options now appear correctly in cart and checkout
  - **No Regressions**: Other field types (checkbox, number, text) continue to work as expected
- **Add-ons Display Logic Simplification - COMPLETE**: Simplified addon display logic to ensure ALL priced addons appear in cart and checkout:
  - **Direct Subtotal Check**: Changed condition from complex `hasValidFieldValue()` to direct `priceInfo?.enabled && priceInfo?.subtotal > 0`
  - **Fixed Multiple Addon Display**: Previously only one addon displayed; now ALL priced addons with subtotal > 0 show correctly
  - **Consistent Logic**: Applied simplified logic to both CartItem (Index page) and ItemizedList (Checkout page)
  - **Updated hasVisibleAddons()**: Helper now uses same direct subtotal check for determining if ADD-ONS section should appear
  - **No Complex Validation**: Removed type-based value validation that could reject valid priced addons
  - **Display Rule**: Show addon if price enabled AND subtotal > 0, regardless of input type or value structure
- **Child Add-ons Value Persistence & API Payload Fix - COMPLETE**: Fixed critical bugs preventing child addon values from being retained and included in API:
  - **buildCustomFields() Fix**: Now includes children with values regardless of parent condition (shouldShowChildren), ensures all filled child values reach the API
  - **restoreCustomFields() Enhancement**: Properly restores pricing info (price/subtotal/fee) and isRepeated flag for both parent and children
  - **shouldShowChildren() Smart Logic**: Shows children if they have values (editing scenario) OR if parent rule is met, preventing loss of filled data
  - **Correct isRepeated Handling**: Non-repeated children stay non-repeated (isRepeated=false), repeated children stay repeated (isRepeated=true)
  - **Text Input Values**: All child input types (text, checkbox, number, etc.) now properly captured and submitted in API payload
  - **Complete State Restoration**: When editing cart items, all child values, pricing, and metadata are fully restored
- **Child Add-ons Restoration Fix - COMPLETE**: Fixed child add-ons not retaining values when editing cart items:
  - **Enhanced restoreCustomFields()**: Now finds original field definitions and calls resizeChildValues for repeated children
  - **Pricing Recalculation**: After restoring child values, pricing (subtotal/fee) is recalculated correctly
  - **Restoration Flow**: Parent value → child values → resizeChildValues → updateAllFees
  - **Works for All Types**: Price per unit, Price per pax, and non-repeated children all restore correctly
- **CartItem & ItemizedList Add-ons Display Fix - COMPLETE**: Fixed validation logic preventing add-ons from displaying in cart and checkout:
  - **ADD-ONS Section in CartItem**: Added dedicated section with dashed divider and uppercase header
  - **Subtotal Display**: Shows add-on subtotals (not prices) matching AddonsNew display
  - **Child Add-ons Hierarchy**: Displays child add-ons with indentation (↳) and lighter background
  - **Fees Consolidation**: All fees (tour + add-ons) combined in single "Taxes & Fees" row
  - **Validation Logic Fix**: Both components now check priceInfo.subtotal first, preventing NaN errors for price-per-pax/per-unit add-ons stored as arrays/objects
  - **Smart Section Display**: hasVisibleAddons() ensures ADD-ONS section only appears when valid add-ons exist
  - **Consistent Behavior**: CartItem (Index page) and ItemizedList (Checkout page) now display add-ons identically
  - **Code Cleanup**: Removed unused isPriceInfoEnabled() method from ItemizedList
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