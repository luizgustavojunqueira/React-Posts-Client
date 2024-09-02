import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../../components/CreatePostModal";
import PostItem from "../../components/PostItem";
import { Post } from "../../shared/types";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  const goToUserPage = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <section className="posts_page">
      <header className="posts_header">
        <h1>Posts Client</h1>
      </header>

      <nav className="posts_nav">
        <button onClick={logout}>Logout</button>
      </nav>

      <button onClick={() => setShowModal(true)} className="add_post_button">
        Add Post
      </button>

      {showModal && (
        <CreatePostModal
          showModal={showModal}
          setShowModal={setShowModal}
          updatePosts={getPosts}
        />
      )}

      <main className="posts_main">
        <ul>
          {posts.map((post: any) => (
            <li key={post.post_id}>
              <PostItem
                content={post.content}
                title={post.title}
                created_at={post.created_at}
                author={post.user_full_name}
                isAuthor={undefined}
                deletePost={undefined}
                goToUserPage={() => goToUserPage(post.user_id)}
              />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

export default Posts;
