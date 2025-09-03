# Jewel ML - Web Basic Usage Example

A web application example demonstrating how to integrate and use the Jewel ML Recommendations API. This project showcases different recommendation models and provides an interactive interface for testing product recommendations.

## Tech Stack

- **Next.js** 10.2.3 - React framework with server-side rendering
- **React** 17.0.2 - User interface library
- **Swiper** 7.4.1 - Modern carousel/slider library
- **Jewel ML API** - Machine learning recommendation service

## Available Recommendation Models

The application supports four different recommendation models:

- **L_prod (You May Like)** - Personalized recommendations based on user historical behavior. Requires a unique_id.
- **B_prod (Similar Items)** - Products similar to the item currently being viewed. Requires an item_id.
- **F_prod (Frequently Bought Together)** - Items that are commonly purchased in the same transaction. Requires an item_id.
- **T_prod (Top Sellers)** - The most popular items across the entire product catalog.

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd jewel-basic-usage-10.2.3
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. **Enter an Item ID**: Input a product identifier in the search field (e.g., "1177646331_multicolor")
2. **Select Models**: Choose one or multiple recommendation models from the dropdown
3. **Load Recommendations**: Click the "Load Recommendations" button to fetch results
4. **Browse Results**: Navigate through product carousels using arrow controls
5. **View API Data**: Expand "View Raw API Response" sections to inspect returned data

## Project Structure

```
/
├── components/           # React components
│   ├── ProductCarousel.js    # Product display carousel
│   └── SearchControls.js     # Search and model selection interface
├── pages/               # Next.js pages and API routes
│   └── index.js             # Main application page with SSR logic
├── public/              # Static assets
├── styles/              # CSS stylesheets
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```

## API Configuration

The application connects to the Jewel ML Recommendations API:

- **Endpoint**: `https://repersonalize.jewelml.io/c/p/{integrationId}/l`
- **Required Parameters**:
  - `model`: Recommendation model identifier
  - `item_id`: Product identifier for context
  - `minimum_items`: Minimum number of items to return (default: 2)
  - `number_of_placements`: Maximum number of recommendations (default: 20)

## Available Scripts

- `npm run dev` - Starts the development server on port 3000
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production server

## Development Notes

- The application uses dynamic imports for the Swiper component to avoid SSR issues
- Multiple API calls are made in parallel when multiple models are selected
- Each carousel displays up to 5 items per view on desktop (responsive breakpoints included)
- Navigation advances by the number of visible slides for better user experience