# ts-playground Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## About ts-playground

ts-playground is a professional learning environment for mastering TypeScript with a focus on backend development. This project is designed to guide developers through a comprehensive learning path with different stages:

- **Stage 1**: Foundations - Learn TypeScript fundamentals and basic concepts
- **Stage 2**: CLI - Build command-line applications with TypeScript
- **Stage 3**: Backend - Develop backend services and APIs
- **Stage 4**: Production - Deploy and maintain production-ready applications

## Installation

```bash
$ npm i
```

## Local Development

```bash
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

## Deployment

Using SSH:

```bash
$ USE_SSH=true npm run deploy
```

Not using SSH:

```bash
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Documentation Structure

- `/blog` - Contains blog posts about TypeScript learning experiences
- `/docs` - Contains the documentation content in Markdown format
  - `/stage1-foundations` - Documentation for the foundations stage
  - `/stage2-cli` - Documentation for the CLI stage
  - `/stage3-backend` - Documentation for the backend stage
  - `/stage4-production` - Documentation for the production stage
- `/src` - Contains custom React components and styling
- `/static` - Contains static assets like images
- `docusaurus.config.js` - Main configuration file for the website
- `sidebars.js` - Defines the sidebar navigation structure
- `package.json` - npm package file with build scripts and dependencies