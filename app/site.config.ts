type SiteConfig = {
  name: string;
  description: string;
  navLinks: {
    [key: string]: {
      text: string;
      to: string;
    };
  };
  sessionName: string;
};

const siteConfig = {
  name: 'Typeformy',
  description: 'An open source Typeform alternative.',
  sessionName: '__typeformy__session',
};

export default siteConfig as SiteConfig;
