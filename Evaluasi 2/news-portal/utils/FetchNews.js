import axios from "axios";

const apiKey = process.env.NEWS_API_KEY;

if (!apiKey) {
  throw new Error("NEWS_API_KEY tidak ditemukan di environment variables");
}

export default async function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`;

  const { data } = await axios.get(url);

  return data.articles.map((article) => ({
    title:
      article.title && article.title.length > 80
        ? article.title.slice(0, 77) + "..."
        : article.title || "No title",
    url: article.url,
    urlToImage: article.urlToImage || "/default-image.jpg",
    publishedAt: article.publishedAt
      ? new Date(article.publishedAt).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Unknown time",
    source: article.source?.name || "Unknown source",
    description: article.description || "",
  }));
}
