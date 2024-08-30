import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

interface IPost {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user_full_name: string;
}

function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (!Cookie.get("token")) return;

    axios
      .get("http://localhost:3000/api/v1/posts/all", {
        headers: { Authorization: `Bearer ${Cookie.get("token")}` },
        withCredentials: true,
      })
      .then((response) => {
        setPosts(response.data.posts);
      });
  }, []);

  return (
    <section className="main_page">
      <header className="main_header">
        <h1>Posts Client</h1>
      </header>

      <main className="main_section">
        <ul>
          {posts.map((post: any) => (
            <li key={post.post_id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>
                <strong>Author:</strong> {post.user_full_name}
              </p>
              <p>
                <strong>Created at:</strong> {post.created_at}
              </p>
              <p>
                <strong>Updated at:</strong> {post.updated_at}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

export default Posts;
