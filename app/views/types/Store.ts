type Image = {
  ID: string;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
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
  post_parent: string;
  guid: string;
  menu_order: string;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  pod_item_id: string;
};

type Info = {
  title: string;
  content: string;
};

type Locate = {
  number: string;
  position: string;
};

type RunTime = {
  range: string;
  day: string;
};

type Direction = {
  mainTitle: string;
  addInfo: string;
};

export type Store = {
  id: number;
  access: Info;
  details: Info;
  directions: {
    content: boolean;
  };
  locate: Locate;
  road: {
    content: string;
  };
  runTime: RunTime;
  store: {
    images: Image[];
  };
  storeName: string;
  direction: Direction;
  storePath: string;
  storeImage: string;
  tel: string;
};
