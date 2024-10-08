import { MouseEventHandler } from "react";

import "./postitem.css";

type PostItemProps = {
  author: string;
  title: string;
  content: string;
  created_at: string;
  isAuthor: boolean | undefined;
  deletePost: MouseEventHandler<HTMLButtonElement> | undefined;
  goToUserPage: MouseEventHandler<HTMLParagraphElement> | undefined;
};

function PostItem(props: PostItemProps) {
  return (
    <article className="post_item">
      <header className="post_item_header">
        <h2>{`${props.title} - ${props.created_at.substring(0, 10)}`}</h2>
        <p onClick={props.goToUserPage}>{`by ${props.author}`}</p>
        {props.isAuthor && <button onClick={props.deletePost}>Delete</button>}
      </header>
      <hr />
      <main className="post_item_main">
        <p>{props.content}</p>
      </main>
    </article>
  );
}

export default PostItem;
