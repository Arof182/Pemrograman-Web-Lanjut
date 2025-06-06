import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import fetchNews from '../utils/fetchNews';
import NewsCard from '../components/NewsCard';

export default function NewsPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews().then(setArticles);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Daftar Berita Utama</h1>
      <button onClick={() => signOut()}>Logout</button>
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}
