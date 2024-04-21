import '~/styles/globals.css';
import siteConfig from '~/site.config';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{siteConfig.name}</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <Toaster />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
