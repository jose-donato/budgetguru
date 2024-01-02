import { SETTINGS } from "./lib/constants";
import "./tailwind.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  MetaFunction
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: SETTINGS.title },
    { name: "description", content: SETTINGS.description },
  ];
};


export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💰</text></svg>" />
        <meta name="color-scheme" content="dark" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
