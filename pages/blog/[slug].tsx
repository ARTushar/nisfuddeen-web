import fs from 'fs';
import path from 'path';
import React from 'react';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';

const Blog: React.FC<{ slug: string; mdxSource: MdxRemote.Source }> = ({
  slug,
  mdxSource,
}) => {
  const content = hydrate(mdxSource);
  return (
    <div className=" p-4 max-w-4xl m-auto prose prose-green">
      <div>{slug}</div>
      <div>{content}</div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'data', 'blog'));

  return {
    paths: files.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'data', 'blog', `${params.slug}.mdx`),
    'utf-8'
  );
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content);
  return {
    props: {
      mdxSource: mdxSource,
      slug: params.slug,
    },
  };
};

export default Blog;
