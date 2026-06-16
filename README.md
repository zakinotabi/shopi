# SHOPI 🛒

## What is it?

SHOPI is a single page e-commerce app where you can browse products fetched from a real API, add them to your cart, adjust quantities, and see a live order summary with subtotal, shipping, tax, and total calculations.

## this app built as part of [The Odin Project] curriculum.

## How it works

The app has three pages: Home, Shop, and Cart, all handled by React Router with a shared layout that keeps the Navbar visible across every page.

The Shop page fetches products from [FakeStore API](https://fakestoreapi.com) and displays them. When you add something to cart, a counter appears in the Navbar showing how many items you have. In the Cart page you can increment or decrement quantities, remove individual items, or clear everything, and the order summary updates live as you go.

All the state (cart, items, counter) lives in the App component and gets passed down to child pages through React Router's Outlet context, so every page has access to the same shared data without prop drilling through multiple layers.

---

## What I learned

### React Router with Outlet context

Setting up nested routes and passing shared state through `useOutletContext` instead of prop drilling was a new pattern for me. Getting the router structure right, especially understanding how `<Outlet />` works as a placeholder for child routes, took some time to click.

### Testing: the hard part

Testing was where I spent most of my time, and honestly where I learned the most.

The first wall I hit was mocking React Router. When you test a component that uses `useOutletContext`, you can't just render it alone because it needs a router context. I learned two different approaches depending on what I was testing:

- **Unit tests**: mock `useOutletContext` directly with `vi.mock` and inject fake data, then render the component alone
- **Integration tests**: use `createMemoryRouter` with the real routes and mock only the API with `vi.stubGlobal('fetch', ...)`, letting real state and real functions run

The difference between these two took me a while to understand. Unit tests are fast and isolated but they can't test relationships between components. Integration tests are slower but they test how things actually work together, like clicking "add to cart" in Shop and seeing the counter update in Navbar.

Since the Shop page fetches products from an API, I had to mock the router AND the fetch call in integration tests. Mocking the router with `createMemoryRouter` gives you real navigation, and mocking fetch with `vi.stubGlobal` replaces the real API call with fake data so tests are fast, offline-safe, and predictable.

I also ran into `vi.hoisted`, a Vitest quirk where `vi.mock` runs before everything else in the file, so any variable you want to share with it has to be hoisted up alongside it.

### Destructuring is everywhere in React

One thing I noticed throughout this whole project, destructuring is in literally everything. Props, context, useState, imports, API responses. everywhere.

---

## Stack

- React
- React Router
- Vite
- CSS Modules
- Vitest + React Testing Library
- FakeStore API

---
