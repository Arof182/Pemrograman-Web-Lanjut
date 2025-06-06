import { useSession, signIn, signOut } from "next-auth/react";
import fetchNews from "../utils/FetchNews";

export async function getServerSideProps() {
  const articles = await fetchNews();
  return { props: { articles } };
}

export default function Home({ articles }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;
  }

  if (!session) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Login untuk Melihat Berita Indonesia</h1>
        <button onClick={() => signIn("google")} style={styles.loginBtn}>
          Login dengan Google
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>Halo, {session.user.name}</h2>
        <button onClick={() => signOut()} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      <h1 style={styles.pageTitle}>Berita Indonesia Terbaru</h1>

      {articles.length === 0 && <p>Tidak ada berita</p>}

      <div style={styles.grid}>
        {articles.map((article, idx) => (
          <article key={idx} style={styles.card}>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={styles.image}
              />
            )}
            <div style={styles.content}>
              <h3 style={styles.articleTitle}>{article.title}</h3>
              <p style={styles.meta}>
                {article.source} &bull; {article.publishedAt}
              </p>
              <p style={styles.description}>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.readMore}
              >
                Baca Selengkapnya →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: "100px auto",
    padding: 20,
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: "#222",
  },
  loginBtn: {
    backgroundColor: "#4285F4",
    border: "none",
    padding: "12px 24px",
    color: "white",
    fontSize: 18,
    borderRadius: 6,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  page: {
    maxWidth: 960,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logoutBtn: {
    backgroundColor: "#e53935",
    border: "none",
    padding: "8px 16px",
    color: "white",
    fontSize: 14,
    borderRadius: 6,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  pageTitle: {
    fontSize: 36,
    marginBottom: 30,
    color: "#111",
    borderBottom: "3px solid #4285F4",
    paddingBottom: 8,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
  },
  card: {
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  articleTitle: {
    fontSize: 20,
    margin: "0 0 8px",
    color: "#222",
    flexGrow: 0,
  },
  meta: {
    fontSize: 12,
    color: "#888",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#444",
    flexGrow: 1,
  },
  readMore: {
    marginTop: 16,
    color: "#4285F4",
    fontWeight: "bold",
    textDecoration: "none",
    alignSelf: "flex-start",
    transition: "color 0.2s",
  },
};
