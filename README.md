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

- `#/` - Home page
- `#/find-your-movie` - Movie search results
- `#/find-your-movie?search=batman&page=2` - Search with pagination
- `#/movie/:imdbID` - Movie details page

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

This project is configured for GitHub Pages.

GitHub Pages URL:

```text
https://sdolle1775.github.io/FESProject_MovieBrowser/
```

The project uses `HashRouter` so dynamic routes work on GitHub Pages.

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the app and deploys the `dist` folder whenever changes are pushed to `main`.

The OMDb API key is currently included in the frontend source for this course project.
