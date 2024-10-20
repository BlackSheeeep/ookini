type Guid = {
  rendered: string;
};

type Title = {
  rendered: string;
};

type Link = {
  href: string;
};

type Curies = {
  name: string;
  href: string;
  templated: boolean;
};

type Links = {
  self: Link[];
  collection: Link[];
  about: Link[];
  "wp:attachment": Link[];
  "wp:term": Link[];
  curies: Curies[];
};

export type NewsItem = {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  template: string;
  categories: number[];
  image: { guid: string; ID: string };
  contents: string[];
  _links: Links;
};

export type NewsData = NewsItem[];
