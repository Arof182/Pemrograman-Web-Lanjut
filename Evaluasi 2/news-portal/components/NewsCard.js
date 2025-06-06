import Link from 'next/link';

export default function NewsCard({ article }) {
  return (
    <div style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
      <img
        src={article.urlToImage}
        alt="thumbnail"
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <h3>{article.title}</h3>
      <small>
        {article.publishedAt} | {article.source}
      </small>
      <br />
      <a href={`/news/${encodeURIComponent(Buffer.from(article.url).toString("base64"))}`}>
        Selengkapnya
      </a>
    </div>
  );
}
