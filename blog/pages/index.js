import Link from 'next/link';
import { client } from '../libs/client';
import { Pagination } from '../components/Pagination';

export default function Home({ blog, totalCount }) {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client
    .get({
      endpoint: 'blog',
      queries: { offset: 0, limit: 5 },
    });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};