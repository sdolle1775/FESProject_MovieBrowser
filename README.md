# Movie Browser

A React movie browsing app built with Vite and the OMDb API.

## Features

- Home page with movie search and animated poster banner
- Movie search results with sorting and pagination
- Dynamic movie details pages by IMDb ID
- Full plot and metadata view for each movie
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- React Router
- OMDb API
- CSS

## Routes

- `/` - Home page
- `/find-your-movie` - Movie search results
- `/find-your-movie?search=batman&page=2` - Search with pagination
- `/movie/:imdbID` - Movie details page

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Deployment

This project is ready to deploy on Vercel.

Recommended settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

The OMDb API key is currently included in the frontend source for this course project.
