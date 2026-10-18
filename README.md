# Event Management System

A React app for exploring events from the Ticketmaster Discovery API, registering for them, and managing your registrations.

## Features

- User registration, login and logout (frontend simulation using Local Storage)
- Persistent login across page refreshes
- Browse upcoming events with search, category chips, city and date filters, and pagination
- Event details page (image, date, time, venue, location, category, price, notes)
- Register for events with duplicate prevention and toast feedback
- My Events page with Upcoming and Completed sections, and cancellation
- Protected routes, loading and error states, form validation, responsive layout

## Tech Stack

React, Redux Toolkit, React Router, Vite, Ticketmaster Discovery API

## Setup

1. Clone the repo and install dependencies:
```bash
   git clone https://github.com/azan123212/event-manager.git
   cd event-manager
   npm install
```
2. Get an API key (Consumer Key) from https://developer.ticketmaster.com/
3. Copy the example env file and add your key:
```bash
   cp .env.example .env
```
   Then set `VITE_TM_API_KEY=your_key` in `.env`.
4. Start the app:
```bash
   npm run dev
```
   Open http://localhost:5173

## Project Structure

```
src/
  app/            Redux store
  features/       auth, events, registrations slices
  components/     reusable components
  pages/          route pages
  services/       Ticketmaster API client
  styles/         CSS files
  utils/          Local Storage helpers
```

## Notes

- Authentication is simulated on the frontend; passwords are stored in Local Storage and this is not secure.
- The Ticketmaster API allows 5,000 requests/day and 2 requests/second.