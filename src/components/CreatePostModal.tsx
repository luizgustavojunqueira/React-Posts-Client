import { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

type PostModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  updatePosts: () => void;
};

function CreatePostModal(props: PostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(title, content);

    axios
      .post(
        "/api/v1/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
        },
      )
      .then((response) => {
        console.log(response);

        if (response.status === 201) {
          props.setShowModal(false);
          props.updatePosts();
        }
      });

    setTitle("");
    setContent("");
  };

  return (
    <section className={`modal ${props.showModal ? "show" : ""}`}>
      <div className="modal-content">
        <button className="close" onClick={() => props.setShowModal(false)}>
          X
        </button>

        <h2>Add Post</h2>

        <form onSubmit={createPost}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit">Add Post</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePostModal;
