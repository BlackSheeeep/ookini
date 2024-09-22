type Category = {
  term_id: string;
  name: string;
  slug: string;
  term_group: string;
  term_taxonomy_id: string;
  taxonomy: string;
  description: string;
  parent: string;
  count: string;
  object_id: string;
  term_order: string;
  pod_item_id: string;
};

type FaqContent = {
  question: string;
  answer: string;
  ID: number;
  post_title: string;
  post_content: string;
  post_excerpt: string;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  comments: boolean;
  category: Category[];
  id: number;
};

type Faq = {
  faqTitle: string;
  faqContent: FaqContent[];
};

type Fee = {
  title: string;
  content: string;
  desc: string;
};

type RentTags = {
  title: string;
  content: string;
};

type RentTime = {
  title: string;
  content: string;
};

type RentReturn = {
  title: string;
  content: string;
};

type RentTips = {
  title: string;
  content: string;
};

type Rent = {
  rentTitle: string;
  rentTags: RentTags;
  rentTime: RentTime;
  rentReturn: RentReturn;
  rentTips: RentTips;
};

export type FeePlan = {
  id: number;
  faq: Faq;
  fee: Fee;
  images: string[];
  pagetitle: string;
  planContent: string;
  rent: Rent;
};
