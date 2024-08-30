import axios from "axios";
import Cookie from "js-cookie";

type UpdateUserModalProps = {
  first_name: string;
  setFirstName: (first_name: string) => void;
  last_name: string;
  setLastName: (last_name: string) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

function UpdateUserModal(props: UpdateUserModalProps) {
  const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(props.first_name, props.last_name);

    axios
      .put(
        "/api/v1/users",
        { first_name: props.first_name, last_name: props.last_name },
        {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
        },
      )
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          props.setShowModal(false);
        }
      });
  };

  return (
    <section className="modal">
      <section className="modal_content">
        <header>
          <h2>Update User</h2>
          <button onClick={() => props.setShowModal(false)}>Close</button>
        </header>
        <main>
          <form onSubmit={updateUser}>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              value={props.first_name}
              onChange={(e) => props.setFirstName(e.target.value)}
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              value={props.last_name}
              onChange={(e) => props.setLastName(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </main>
      </section>
    </section>
  );
}

export default UpdateUserModal;
