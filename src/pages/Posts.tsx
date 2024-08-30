import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
interface IPost {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user_full_name: string;
}
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();

  const getPosts = async () => {
    if (!Cookie.get("token")) navigate("/", { replace: true });

    axios
      .get("api/v1/posts/all", {
        headers: { Authorization: `Bearer ${Cookie.get("token")}` },
      })
      .then((response) => {
        setPosts(response.data.posts);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const logout = () => {
    Cookie.remove("token");
    navigate("/", { replace: true });
  };
  return (
    <section className="main_page">
      <header className="main_header">
        <h1>Posts Client</h1>
      </header>

      <nav className="main_nav">
        <button onClick={logout}>Logout</button>
      </nav>
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
