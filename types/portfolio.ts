export type PortfolioData = {
  meta: {
    handle: string;
    email_display: string;
    email: string;
    location: string;
    timezone: string;
    availability: string;
  };

  nav: {
    label: string;
    href: string;
  }[];

  hero: {
    role: string[];
  };

  about: {
    label: string;
    title: string;
    body: string[];
    portraitCaption: string[];
    journeyTitle: string;
    journey: {
      year: string;
      roles: {
        title: string;
        org: string;
        note: string;
      }[];
      image: string;
    }[];
  };

  projects: {
    label: string;
    title: string;
    hint: string;
    seeAll: {
      label: string;
      url: string;
    };
    list: {
      name: string;
      year: string;
      type: string;
      theme: string;
      description: string;
      note: string;
      tags: string[];
      link: string;
      image: string;
    }[];
  };

  stack: {
    label: string;
    title: string;
    items: {
      abbr: string;
      name: string;
    }[];
  };

  contact: {
    label: string;
    kicker: string;
    title: string;
  };

  socials: {
    label: string;
    url: string;
  }[];

  images: {
    avatar: string;
    portrait: string;
  };
};