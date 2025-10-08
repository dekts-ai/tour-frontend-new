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

### Complete UI Redesign - "Native Journey" Design System (October 8, 2025)
Complete redesign of the entire application with a modern, nature-inspired design system called "Native Journey":

**Design System ("Native Journey"):**
- **Color Palette**:
  - Primary Teal: #0D9488 (main brand color)
  - Primary Teal Light: #14B8A6 (hover/gradient states)
  - Primary Terracotta: #E07856 (accent/call-to-action)
  - Primary Amber: #F59E0B (alerts/highlights)
  - Neutral scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Typography**:
  - Font Family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
  - Type Scale: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px)
  - Font Weights: medium (500), semibold (600), bold (700)
- **Spacing System**: 8px base unit (space-1 through space-10)
- **Border Radius**: md (6px), lg (12px), xl (16px), full (9999px)
- **Shadows**: sm, md, lg with consistent depth
- **Transitions**: 200ms ease for smooth interactions

**Navigation & Header (NavBtns.vue):**
- Brand logo with geometric pattern icon
- "Native Journeys - Cultural Tours" branding
- Progress-based step navigation showing:
  - Step 1: Browse Tours
  - Step 2: Choose Date  
  - Step 3: Add Extras
  - Step 4: Checkout
- Visual step indicators (numbers for pending, checkmarks for completed)
- Teal gradient for active step, gray for completed
- Disabled state for steps not yet accessible
- Fully responsive with mobile optimization

**Tours Browse Page (Index.vue / AvailablePackage.vue):**
- Auto-fill responsive grid (min 320px cards)
- Modern tour cards with:
  - 240px image height with hover zoom effect
  - Duration badge overlaid on image (white background with blur)
  - Teal gradient "Select Tour" buttons with arrow icons
  - 2-line description with ellipsis
  - Elevated shadow on hover with translateY animation
- Selected tours section with visual distinction
- Clean empty state placeholders

**Schedule Page (Init.vue / TourForm.vue):**
- 3-column layout: Date (380px) | Times (1fr) | Summary (440px)
- Calendar in white card with shadow
- Vertical time slot list with:
  - Teal border on selection with gradient background
  - Availability badges (seats left, call to book, sold out)
  - Smooth hover animations with translateX
  - Custom scrollbar styling
- Booking Summary with:
  - Tour preview card (80px image thumbnail)
  - Selected details in light gray containers
  - Guest selection with modern counters (teal accent)
  - Teal gradient pricing badges
  - Pricing breakdown in clean cards
  - Gradient "Continue" button with hover lift

**Add-Ons Page (Addons.vue):**
- 2-column layout: Options (1fr) | Summary (440px)
- Checkbox options with:
  - White cards with hover border color change
  - Teal gradient checkmarks when selected
  - Terracotta pricing display
- Modern form inputs with:
  - 2px borders and teal focus states
  - Focus ring with teal glow
  - Rounded corners (12px)
- Summary in elevated white card
- Gradient continue button

**Checkout Page (Checkout.vue / CheckoutForm.vue):**
- 2-column layout: Form (1fr) | Summary (480px)
- White card sections with shadows
- Form fields with:
  - Teal focus states with glow effect
  - Smooth transitions
  - Accessible checkbox styling
- Payment section with Stripe integration
- Trust-building elements (policy links in teal)
- Large gradient "Complete Booking" button
- Disabled state styling

**Technical Updates:**
- Created comprehensive design system in `src/assets/css/design-system.css`
- Imported design system globally in App.vue
- Redesigned all major page components with new design tokens
- Updated navigation tab IDs to match workflow (1, 2, 4, 5)
- All components use CSS custom properties for consistency
- Fully responsive across all breakpoints
- Production-ready with successful compilation
- Maintained all existing functionality while improving UX

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
