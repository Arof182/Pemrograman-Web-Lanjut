import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/"); // Redirect ke halaman utama kalau sudah login
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div style={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  if (session) {
    return null; // sementara jangan render apa-apa saat redirect
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Selamat Datang</h2>
        <p style={styles.subtitle}>Login untuk mengakses portal berita</p>

        <button
  onClick={() => signIn("google")}
  style={styles.loginBtn}
>
  Login dengan Google
</button>
              </div>
            </div>
          );
        }

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "40px 50px",
    borderRadius: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: 320,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285F4",
    border: "none",
    borderRadius: 8,
    color: "white",
    padding: "12px 24px",
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
    userSelect: "none",
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 12,
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
};
