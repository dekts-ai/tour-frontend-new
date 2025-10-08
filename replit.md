# Native American Tours - Frontend Application

## Overview
This is a Vue.js 3 frontend application for booking Native American tours. The application provides a user-friendly interface for:
- Browsing available tour packages
- Selecting dates and times
- Adding tour add-ons
- Processing payments via Stripe
- Managing booking confirmations

## Project Architecture

### Tech Stack
- **Framework**: Vue.js 3 with Options API
- **State Management**: Vuex
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **UI Components**: Custom Vue components
- **Payment Processing**: Stripe integration
- **Maps**: Google Maps integration (@fawmi/vue-google-maps)
- **Build Tool**: Vue CLI 5

### Project Structure
```
src/
├── components/          # Vue components organized by feature
│   ├── Checkout/       # Payment and checkout components
│   ├── Forms/          # Form input components
│   ├── Hotel/          # Hotel pickup components
│   ├── Initialization/ # Tour initialization components
│   ├── Layout/         # Header and footer components
│   ├── Nav/            # Navigation components
│   ├── Start/          # Tour selection components
│   └── User/           # User input components
├── store/              # Vuex store
├── utils/              # Utility functions (date, currency, geo, etc.)
├── data/               # Static data
├── App.vue             # Root component
├── main.js             # Application entry point
└── routers.js          # Route definitions
```

## Configuration

### Replit Environment Setup
The application has been configured to run in the Replit environment:

1. **Dev Server Configuration** (vue.config.js):
   - Host: `0.0.0.0` (allows external access)
   - Port: `5000` (required for Replit)
   - Allowed Hosts: `all` (required for Replit proxy/iframe)

2. **Workflow**: 
   - Command: `npm run serve`
   - Port: 5000
   - Output: webview

3. **Deployment Configuration**:
   - Type: autoscale (static website)
   - Build: `npm run build`
   - Run: `npx http-server dist -p 5000 -a 0.0.0.0`

### Environment Variables
The application requires several environment variables (these should be set in Replit Secrets):

- `VUE_APP_STRIPE_PUBLISHABLE_KEY` - Stripe publishable API key for payment processing
- `VUE_APP_ENV` - Environment identifier (LOCAL, STAGING, PRODUCTION, etc.)
- `VUE_APP_BASE_URL` - Base URL of the frontend application
- `VUE_APP_API_URL` - Backend API URL (domain/path)
- `VUE_APP_ASSET_URL` - Asset server URL
- `VUE_APP_MAP_KEY` - Google Maps API key (optional)

### URL Parameters
The application uses URL parameters to initialize the booking flow:
- `tid` - Tenant ID
- `oid` - Tour Operator ID
- `pid` - Package ID (for single package)
- `cids` - Combo IDs (for package combinations)
- `aid` - Affiliate ID
- `date` - Selected date

Example: `?tid=example&oid=1&pid=123&date=2025-10-08`

## Backend Integration
This is a **frontend-only application** that connects to an external backend API. The API is configured through environment variables and URL parameters. The application expects:

1. **Multi-tenant Architecture**: The backend URL is constructed using tenant ID from URL parameters
2. **API Endpoints**: Tour packages, availability, booking, payment processing
3. **Format**: `https://{tenant}.{VUE_APP_API_URL}`

**Note**: The backend is not included in this repository. You will need to configure the backend API URL and ensure it's accessible.

## Development

### Running Locally
1. Install dependencies: `npm install`
2. Set environment variables (copy from .env.example)
3. Run dev server: `npm run serve`
4. Access at: http://localhost:5000 (or configured port)

### Running in Replit
1. The application is pre-configured and ready to run
2. Click the "Run" button to start the dev server
3. The webview will automatically open
4. Add required URL parameters to test functionality

### Building for Production
```bash
npm run build
```
This creates optimized static files in the `dist/` directory.

### Testing
- E2E tests: `npm run e2e` (Playwright)
- Test files located in: `e2e/` and `tests-examples/`

## Recent Changes (October 2025)

### UI Redesign (October 8, 2025)
Complete redesign of the user interface with modern, clean aesthetics:

**Navigation & Header:**
- Redesigned navigation with "Book Your Experience" branding
- Pill-style tab navigation (Tours, Schedule, Add-Ons, Checkout)
- Active tab styling with #2d3139 background
- Inactive tabs with #f5f3f3 background
- Close button (×) on the right

**Tours Page (Index.vue):**
- 3-column responsive grid layout for tour cards
- Clean card design with image, title, description, pricing
- "From $XX per person" pricing display
- Orange #df7151 "Select Tour" buttons
- Responsive: 2 columns on tablet, 1 on mobile

**Schedule Page (Init.vue / TourForm.vue):**
- Two-column layout: calendar/guest selection (left), time slots (right)
- Calendar picker for date selection
- Interactive time slot cards with availability info
- Guest selection with increment/decrement counters
- Clean section titles and #fafafa backgrounds
- Visual feedback for selected, disabled, and sold-out slots

**Add-Ons Page (Addons.vue):**
- Left: booking options (checkboxes, dropdowns, text areas)
- Right: booking summary sidebar
- Checkbox options for Texi Pickup and VIP Lounge
- Meal preference dropdown
- Payment notes and internal comments fields
- Summary with subtotal, taxes, and total
- Orange "Continue" button

**Checkout Page (Checkout.vue / CheckoutForm.vue):**
- Clean form layout for contact information
- Payment section with Stripe integration
- Checkbox for terms and conditions with policy link
- Email updates opt-in
- Orange "Complete Booking" button
- Responsive layout with summary on right

**Design System:**
- Primary CTA color: #df7151 (orange)
- Active state: #2d3139 (dark gray)
- Inactive state: #f5f3f3 (light gray)
- Background: #fafafa (off-white)
- Consistent spacing and border-radius (8px)
- Clean typography with Inter font
- Fully responsive design

**Technical Updates:**
- Fixed all navigation guards to allow smooth flow between tabs
- Added comprehensive CSS for new design components
- Maintained all existing functionality while improving UX
- Production-ready with successful compilation

### Import Setup for Replit
- Installed all Node.js dependencies
- Configured Vue CLI dev server for Replit environment:
  - Bound to 0.0.0.0:5000
  - Allowed all hosts for proxy access
- Set up workflow for automatic dev server startup
- Configured deployment for static site hosting
- Documented project structure and requirements

## Known Issues & Limitations

1. **Backend Dependency**: Application requires external backend API to function
2. **Environment Variables**: Must be configured for full functionality
3. **URL Parameters**: Required for proper initialization (tid, oid required at minimum)
4. **Payment Processing**: Requires valid Stripe API keys
5. **Google Maps**: Requires API key for map functionality

## User Preferences
None documented yet.

## Next Steps

To fully configure this application:
1. Set up backend API or connect to existing backend
2. Add required environment variables to Replit Secrets:
   - `VUE_APP_STRIPE_PUBLISHABLE_KEY`
   - `VUE_APP_API_URL`
   - `VUE_APP_MAP_KEY` (optional)
3. Test with proper URL parameters (e.g., `?tid=demo&oid=1&pid=1`)
4. Configure production deployment settings if needed
