# FreshBasket — Redesigned Grocery Delivery App

A responsive React + Vite grocery storefront with product search, category filters, add-to-cart, quantity controls, and live cart totals.

## Requirements
- Node.js (LTS recommended)
- npm (included with Node.js)

## Run on Windows / VS Code
1. Extract `FreshBasket-Redesigned.zip`.
2. Open VS Code and choose **File → Open Folder**.
3. Select the extracted `FreshBasket-Redesigned` folder.
4. Open **Terminal → New Terminal**.
5. Run:
   ```bash
   npm install
   npm run dev
   ```
6. Open the local URL printed in the terminal, usually `http://localhost:5173/`.

## Notes
- Product photos are loaded from Unsplash, so an internet connection is needed for those images.
- The cart is stored in React state and resets after a page refresh; localStorage persistence can be added next.
- The checkout button is a placeholder; payments and order submission are not connected.
