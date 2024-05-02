import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import siteConfig from '~/site.config';

export const meta: MetaFunction = () => {
  return [
    { title: siteConfig.name },
    {
      name: 'description',
      content: siteConfig.description,
    },
  ];
};

export default function Index() {
  return (
    <section className="w-full flex flex-col justify-center items-center h-screen overflow-hidden">
      <h1>Home Page</h1>
      <Button variant="link" asChild>
        <Link to="/form">Go to Form</Link>
      </Button>
    </section>
  );
}
