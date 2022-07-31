# tietokilta.fi-frontend

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Tietokilta_tietokilta.fi-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Tietokilta_tietokilta.fi-frontend)

## Requirements

- Node (see .nvmrc for version used)
- Running instance of tikweb-cms (local or prod, see section `Configuring backend`)

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

## Configuring backend

By default, Gatsby will try to connect to localhost:1337, where Strapi is expected to be running. If you want to use local Strapi, see the set up guide in the `tikweb-cms` repository. If you want to instead connect to the production version of Strapi, rename the `.env.example` file to `.env.development`, and put the following content in the file, if it is not there:

```
STRAPI_URL=https://tikweb-prod-app-cms.azurewebsites.net
STRAPI_API_KEY=<api key here>
```

## TypeScript

Gatsby currently uses babel to transform TS into JS, which totally ignores typechecking. This is a bit unfortunate, but hopefully it will change someday. In order to check types properly:

- Setup your editor to highlight type errors. VSCode will do this out of the box.
- Consider running `npm run type-check` periodically, or even use it in watch mode: `npm run type-check:watch`.

## Linting & Code style

Code style is defined by Prettier, which is ran through ESLint. In order to check for linting errors and code style, run `npm run lint`. In order to fix auto-fixable issues, use `npm run lint:fix`.

Consider using ESLint and Prettier plugins in your editor, with autoformatting on save enabled.

## Adding pages

Pages can be added by adding a new file to `src/pages`. See:

- Docs about [routing](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/), especially [file system routing API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/).
- Gatsby used to have createPage API before, nowadays it's not that needed if using the FS routing API. See [this](https://www.gatsbyjs.com/blog/fs-route-api/) for context.

# Deployment

CI will deploy main branch automatically. In Github repository settings, set correct `AZURE_CREDENTIALS` values in format:

```
{
  "clientId": "<GUID>",
  "clientSecret": "<GUID>",
  "subscriptionId": "<GUID>",
  "tenantId": "<GUID>"
}
```

**NOTE!** Client secret will expire after 2 years.

# Common issues

`package-lock.json` changes lockfile version when running `npm i`

- run `nvm use` to install the Node/NPM version specified in `.nvmrc`
