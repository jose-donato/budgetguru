# 📌 Overview

BudgetGuru is your AI-powered guide to smarter personal finance. More details on the following blogpost: [My Journey with Hanko: How to Build a Financial App in Record Time](https://dev.to/josedonato/my-journey-with-hankoio-how-to-build-a-financial-app-in-record-time-4ipg).

## Demo (click on the video)

[![Video](https://img.youtube.com/vi/Xs9-IvLBrh4/0.jpg)](https://www.youtube.com/watch?v=Xs9-IvLBrh4)

## 🔍 Table of Contents

* [💻 Stack](#stack)
* [🚀 Run Locally](#run-locally)
* [🗺️ Roadmap](#roadmap)

## 💻 Stack

- [sveltekit](https://kit.svelte.dev/): Framework for building Svelte applications.
- [tailwindcss](https://tailwindcss.com/): Utility-first CSS framework for rapidly building custom designs.
- [melt-ui/svelte](https://github.com/melt-ui/svelte): UI library for building Svelte applications.
- [teamhanko/hanko-elements](https://github.com/teamhanko/hanko-elements): Authentication library for integrating Hanko authentication into Svelte projects.
- [drizzle-orm](https://orm.drizzle.team/): ORM for interacting with databases.
- [ag-grid-community](https://www.ag-grid.com/): Grid component for displaying and manipulating large sets of data.
- [chart.js](https://www.chartjs.org/): JavaScript charting library for creating interactive and customizable charts.
- [libsql/client](https://github.com/libsql/client): SQL client for interacting with databases.

## 🚀 Run Locally
1. Clone the budgetguru repository:
```sh
git clone https://github.com/jose-donato/budgetguru
```
2. Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3. Populate .env file with your environment variables.
```bash
PUBLIC_HANKO_API_URL=""
TURSO_URL=''
TURSO_API_TOKEN=''
``` 
Note: You can find your Turso API tokens in [here](https://turso.tech/) and hanko api url in [here](https://hanko.io/).

4. Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

5. Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## 🗺️ Roadmap
- [ ] Expand functionality to include debt and investment tracking.
- [ ] Integrate AI-powered financial insights using open-source models for expense forecasting.
- [ ] Implement image capabilities for scanning receipts and automatic transaction detail addition.
- [ ] Regularly share updates as the project progresses.
- [ ] Have any ideas? Feel free to open an issue or submit a pull request!
