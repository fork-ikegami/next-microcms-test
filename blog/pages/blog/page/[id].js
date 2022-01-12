import Link from 'next/link';
import { client } from '../../../libs/client';
import { Pagination } from '../../../components/Pagination';

const PER_PAGE = 5;

export default function BlogPageId({ blog, totalCount }) {
  return (
    <div>
      <ul>
        {blog.map(blog => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const pageNumbers = [];

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`)

  return { paths, fallback: false};
};

// データ取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const data = await client
    .get({
      endpoint: 'blog',
      queries: {
        offset: `${(id - 1) * 5}`,
        limit: 5,
      }
    })

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    }
  };
};