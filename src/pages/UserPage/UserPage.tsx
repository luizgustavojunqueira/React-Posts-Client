import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../shared/types";
import CreatePostModal from "../../components/CreatePostModal";
import UpdateUserModal from "../../components/UpdateUserModal";

import PostItem from "../../components/PostItem";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  posts: Post[];
};

function UserPage() {
  const [user, setUser] = useState({} as User);
  const [loggedInUser, setLoggedInUser] = useState({} as User);

  const [showPostModal, setShowPostModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!Cookie.get("token")) navigate("/", { replace: true });

    getMe();
    getUser();
  }, []);

  const getMe = async () => {
    axios
      .get("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((response) => {
        setLoggedInUser(response.data.user);
      });
  };

  const getUser = async () => {
    axios
      .get(`/api/v1/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      });
  };

  const deletePost = (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    axios
      .delete(`api/v1/posts/${id}`, {
        headers: { Authorization: `Bearer ${Cookie.get("token")}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser({
            ...user,
            posts: user.posts.filter((post) => post.post_id !== id),
          });
        }
      });
  };

  const setFirstName = (first_name: string) => {
    setUser({ ...user, first_name });
  };

  const setLastName = (last_name: string) => {
    setUser({ ...user, last_name });
  };

  return (
    <section className="user_page">
      <header className="user_header">
        <h1>User Page</h1>
        <a onClick={() => navigate("/posts", { replace: true })}>Posts</a>
      </header>

      <main className="user_main">
        <p>
          {user.first_name} {user.last_name}
        </p>

        <h2>Posts</h2>

        {loggedInUser.email === user.email && (
          <button onClick={() => setShowUpdateUserModal(true)}>
            Update User
          </button>
        )}
        <button onClick={() => setShowPostModal(true)}>Add Post</button>

        {loggedInUser.email === user.email && showPostModal && (
          <CreatePostModal
            showModal={showPostModal}
            setShowModal={setShowPostModal}
            updatePosts={() => { }}
          />
        )}

        {loggedInUser.email === user.email && showUpdateUserModal && (
          <UpdateUserModal
            first_name={user.first_name}
            setFirstName={setFirstName}
            last_name={user.last_name}
            setLastName={setLastName}
            showModal={showUpdateUserModal}
            setShowModal={setShowUpdateUserModal}
          />
        )}

        <ul>
          {user.posts &&
            user.posts.map((post: any) => (
              <li key={post.post_id}>
                <PostItem
                  content={post.content}
                  title={post.title}
                  created_at={post.created_at}
                  author={post.user_full_name}
                  isAuthor={loggedInUser.email === user.email}
                  deletePost={(e) => {
                    deletePost(e, post.post_id);
                  }}
                  goToUserPage={() => { }}
                />
              </li>
            ))}
        </ul>
      </main>
    </section>
  );
}

export default UserPage;
