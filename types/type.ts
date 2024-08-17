export type BlogAuthor = {
  name: string;
  avatar: string;
};

export type Blog = {
  time: number;
  blocks: Array<
    | HeaderBlock
    | ParagraphBlock
    | ImageBlock
    | QuoteBlock
    | ChecklistBlock
    | ListBlock
    | CodeBlock
  >;
  version: string;
  title: string;
  subTitle?: string;
  author: BlogAuthor;
};

export type HeaderBlock = {
  id: string;
  type: "header";
  data: {
    text: string;
    level: number;
  };
};

type ParagraphBlock = {
  id: string;
  type: "paragraph";
  data: {
    text: string;
  };
};

type ImageBlock = {
  id: string;
  type: "image";
  data: {
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
    file: {
      url: string;
      raw: object;
    };
  };
};

type QuoteBlock = {
  id: string;
  type: "quote";
  data: {
    text: string;
    caption: string;
    alignment: string;
  };
};

type ChecklistBlock = {
  id: string;
  type: "checklist";
  data: {
    items: Array<{
      text: string;
      checked: boolean;
    }>;
  };
};

type ListBlock = {
  id: string;
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: string[];
  };
};

type CodeBlock = {
  id: string;
  type: "code";
  data: {
    code: string;
  };
};

export type BlogPostResponse = {
  slug: string;
  createdAt: Date;
};
