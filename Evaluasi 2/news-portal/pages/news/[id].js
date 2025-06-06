import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!id) return;
    const url = Buffer.from(id, "base64").toString();

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle({ content: data.contents, url });
      });
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Detail Berita</h1>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Lihat di sumber asli
      </a>
      <iframe srcDoc={article.content} style={{ width: "100%", height: "90vh" }}></iframe>
    </div>
  );
}
