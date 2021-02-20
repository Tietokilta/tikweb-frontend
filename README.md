# tietokilta.fi-frontend

## Requirements

- Node (see .nvmrc for version used)

## Running development server locally

Install dependencies

```
npm install
```

Start development server.

```
npm run develop
```

By default, the local development server is running at `localhost:8000`.

## TypeScript

Gatsby currently uses babel to transform TS into JS, which totally ignores typechecking. This is a bit unfortunate, but hopefully it will change someday. In order to check types properly:

- Setup your editor to highlight type errors. VSCode will do this out of the box.
- Consider running `npm run type-check` periodically, or even use it in watch mode: `npm run type-check:watch`.

## Adding pages

Pages can be added by adding a new file to `src/pages`. See:

- Docs about [routing](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/), especially [file system routing API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/).
- Gatsby used to have createPage API before, nowadays it's not that needed if using the FS routing API. See [this](https://www.gatsbyjs.com/blog/fs-route-api/) for context.
