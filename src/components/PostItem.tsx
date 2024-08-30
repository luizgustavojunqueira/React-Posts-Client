import { MouseEventHandler } from "react";

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
    <article>
      <header>
        <h2>{props.title}</h2>
        <p onClick={props.goToUserPage}>{props.author}</p>
        <p>{props.created_at}</p>
        {props.isAuthor && <button onClick={props.deletePost}>Delete</button>}
      </header>
      <main>
        <p>{props.content}</p>
      </main>
    </article>
  );
}

export default PostItem;
