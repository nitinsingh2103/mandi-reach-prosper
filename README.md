# Kisan Connect

Create a modern, attractive, responsive React.js website for farmers called “KisanMandi” — a digital platform where farmers can sell their crops directly and compare crop prices across nearby/local markets (mandis).

Main Goal

The website should help farmers:

Sell their crops online.

See current crop prices in nearby markets.

Compare prices between different mandis.

Find the market offering the best price.

Understand historical price trends.

Manage their crop listings and sales.

The design should be simple enough for farmers to use easily, but visually modern and professional.

Technology

Use React.js

Use functional components and React Hooks.

Use React Router for navigation.

Use Tailwind CSS or clean modern CSS for styling.

Use reusable components.

Use mock/local JSON data for now instead of requiring a backend.

Structure the project so a Node.js/Express backend and real market API can easily be connected later.

Use charts for price trends.

Use icons wherever appropriate.

Make the website fully responsive for desktop, tablet, and mobile.

Visual Design

Use a green, white, and earthy color palette inspired by agriculture.

Design style:

Clean

Modern

Professional

Attractive

Farmer-friendly

Large readable text

Clear buttons

Rounded cards

Soft shadows

Agriculture-related icons/images

Plenty of whitespace

Responsive layout

The website should feel like a combination of a farmer marketplace + mandi price comparison platform + agricultural dashboard.

Use subtle animations and hover effects, but don't overdo them.

1. Landing Page

Create an attractive homepage.

Navbar

Include:

KisanMandi logo

Home

Market Prices

Sell Crop

Price Trends

About

Login

“Get Started” button

Hero Section

Large heading:

“Sell Your Crops at the Best Market Price”

Subtitle:

“Compare prices across local mandis, find the best buyers, and make better selling decisions.”

Buttons:

Compare Mandi Prices

Sell Your Crop

Add an attractive agriculture/farmer image or illustration.

Quick Price Search

Create a prominent search section:

“Check Today's Mandi Prices”

Fields:

Select Crop

Select State

Select District

Select Market/Mandi

Button:
Search Prices

Popular Crops

Display cards for crops such as:

Wheat

Rice

Potato

Onion

Tomato

Maize

Mustard

Cotton

Each card should show:

Crop image/icon

Current average price

Price unit (₹/quintal)

Price change percentage

How It Works

Show 3 or 4 steps:

Select Your Crop

Compare Local Markets

Find the Best Price

Sell Your Crop

Why KisanMandi?

Create feature cards:

Real-time/local mandi price comparison

Nearby market discovery

Historical price trends

Direct crop selling

Transparent pricing

Easy-to-use interface

Footer

Include:

KisanMandi logo

About

Contact

Help

Privacy Policy

Terms

Social media icons

2. Market Price Comparison Page

This is one of the most important pages.

Heading:

“Compare Mandi Prices”

Create filters:

Crop

State

District

Market

Date

Display a price comparison table.

Example:

MarketCropMin PriceMax PriceModal PriceDistancePrayagraj MandiWheat₹2,200₹2,450₹2,35012 kmKanpur MandiWheat₹2,250₹2,500₹2,42085 kmLucknow MandiWheat₹2,300₹2,550₹2,450120 km

Highlight the best price with a green badge:

BEST PRICE

Add sorting:

Highest price

Lowest price

Nearest market

Most profitable

Add a button:

“View Market Details”

3. Market Details Page

When the farmer clicks on a market, show:

Market name

Location

Distance

Today's price

Minimum price

Maximum price

Modal price

Number of buyers

Available facilities

Market opening hours

Create a price trend chart showing the crop price over the last:

7 days

30 days

6 months

Add:

“Sell Here” button.

4. Price Trends Page

Create an analytics dashboard for crop prices.

Heading:

“Crop Price Trends”

Allow the user to select:

Crop

Market

Time period

Display an attractive line chart.

Example:

Wheat Price Trend

₹/Quintal

Show:

Current price

Highest price

Lowest price

Average price

Percentage change

Add a simple insight card:

“Wheat prices increased by 8.4% in the selected market over the last 30 days.”

Also create a section:

“Best Time to Sell”

Use mock data to provide a simple recommendation.

Clearly label predictions/recommendations as estimated insights, not guaranteed prices.

5. Sell Your Crop Page

Create a farmer-friendly crop listing form.

Heading:

“Sell Your Crop”

Fields:

Crop Name

Crop Variety

Quantity

Unit

Expected Price

Harvest Date

Location

Preferred Market

Description

Upload Crop Photos

Add a large button:

“List My Crop”

After submitting, show a success notification:

“Your crop has been listed successfully!”

Also show an estimated potential selling value:

Quantity × Expected Price

6. Crop Marketplace Page

Create a marketplace where buyers can see available crops.

Cards should display:

Crop image

Crop name

Variety

Quantity available

Asking price

Farmer location

Harvest date

Quality

“View Details” button

“Contact Farmer” button

Add filters:

Crop

Price

Location

Quantity

Quality

Add search functionality.

7. Farmer Dashboard

Create a dashboard after login.

Display:

Overview Cards

Active Listings

Total Quantity Listed

Average Expected Price

Sold Crops

Estimated Revenue

My Crop Listings

Show a table/cards with:

Crop

Quantity

Price

Status

Date Listed

Actions

Statuses:

Active

Sold

Pending

Price Alerts

Create a section:

“Price Alert”

Example:

“Wheat price in Prayagraj Mandi increased by 6% today.”

Add a button:

“View Market”

8. Login / Signup

Create attractive authentication pages.

Login:

Mobile Number

Password

Login button

Forgot password

Create account

Signup:

Name

Mobile Number

Password

Location

Farmer/Buyer selection

Keep the authentication UI ready for future backend integration.

9. Crop Details Page

When a crop is selected, show:

Large crop image

Crop name

Variety

Quantity

Expected price

Location

Harvest date

Quality

Seller information

Price comparison

Nearby mandi prices

Buttons:

Contact Farmer

Buy Crop

Compare Prices

10. Location-Based Market Finder

Create a section where farmers can find nearby mandis.

Show market cards containing:

Market name

Distance

Current crop price

Address

Opening hours

Best price badge

View details button

Use mock location data for now.

Structure the code so browser geolocation/API integration can be added later.

Important UI Features

Add:

Price Change Indicators

Green:
↑ Price increased

Red:
↓ Price decreased

Neutral:
→ Price unchanged

Best Price Badge

When one mandi has the highest price, prominently display:

🏆 BEST PRICE

Profit Calculator

Create a simple calculator:

Quantity:
[ 100 ]

Expected Price:
[ ₹2400 ]

Estimated Revenue:
₹2,40,000

Also allow comparison:

Mandi A → ₹2,300/quintal
Mandi B → ₹2,450/quintal
Mandi C → ₹2,380/quintal

Show:

Best option: Mandi B

Potential additional revenue: ₹15,000

Data

Use realistic mock Indian agricultural data.

Use:

Indian Rupee (₹)

Prices in ₹/quintal

Indian states and districts

Example markets/mandis

Example farmer listings

Include crops such as:
Wheat, Rice, Potato, Onion, Tomato, Maize, Mustard, Cotton, Soybean and Sugarcane.

Do NOT claim that mock prices are real-time prices.

Clearly indicate:

“Demo data — connect to a live mandi/Agmarknet/e-NAM data source for real prices.”

Navigation

Use React Router with routes similar to:

/
/market-prices
/market/:id
/price-trends
/sell
/marketplace
/crop/:id
/dashboard
/login
/signup

Make sure every navigation button works.

Components

Create reusable React components such as:

Navbar

Footer

CropCard

MarketCard

PriceTable

PriceChart

PriceBadge

SearchBar

FilterPanel

ProfitCalculator

ListingCard

DashboardCard

Modal

Button

Input

Select

Keep the code organized into folders such as:

src/
components/
pages/
data/
hooks/
utils/
assets/

Final Requirements

The website should look like a real production-ready agricultural startup, not a basic student project.

Prioritize:

Attractive UI

Easy navigation

Mobile responsiveness

Clear price comparison

Useful farmer dashboard

Crop selling functionality

Charts and visual analytics

Realistic Indian agricultural context

Reusable React components

Clean and maintainable code

Add realistic mock data and make all buttons, filters, navigation, forms, charts, and interactions work on the frontend.

The final result should be a polished KisanMandi farmer marketplace and local mandi price comparison platform that can later be connected to a Node.js/Express backend and real mandi price APIs.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mandi-reach-prosper.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d6e1155f-3a05-4403-ab4a-162d7363ee90).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
