import { useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";

function AccountsPage() {
  const [modalIsOpen, setIsOpen] = useState({
    modalAccount: false,
    modalAccountID: false,
    modalTags: false,
  });

  const [tags, setTags] = useState<string[]>([]);

  let account = {
    username: "",
    email: "",
    password: "",
    phone: "",
    notes: ``,
    tags: [""],
  };

  // @ts-ignore
  let accountId: string;

  function openModalAccount() {
    setIsOpen({
      modalAccount: true,
      modalAccountID: false,
      modalTags: false,
    });

    setTags([]);
  }

  function closeModalAccount() {
    setIsOpen({
      modalAccount: false,
      modalAccountID: false,
      modalTags: false,
    });

    setTags([]);
  }

  function openModalAccountID() {
    setIsOpen({
      modalAccount: false,
      modalAccountID: true,
      modalTags: false,
    });
  }

  function closeModalAccountID() {
    setIsOpen({
      modalAccount: false,
      modalAccountID: false,
      modalTags: false,
    });

    setTags([]);
  }

  function openModalTags() {
    if (tags.length == 0)
      return toast.error("You need to add at least 1 tag", {
        duration: 2000,
        className: "bg-red-400",
        position: "top-right",
      });

    setIsOpen({
      modalAccount: true,
      modalAccountID: false,
      modalTags: true,
    });
  }

  function closeModalTags() {
    setIsOpen({
      modalAccount: true,
      modalAccountID: false,
      modalTags: false,
    });
  }

  const addTagHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (tags.length >= 6) {
      return toast.error("You can only add 6 tags", {
        duration: 2000,
        className: "bg-red-400",
        position: "top-right",
      });
    }

    const tag = (
      e.currentTarget as HTMLButtonElement
    ).parentElement?.querySelector("input[name='tags']") as HTMLInputElement;

    if (tag.value == "") {
      return toast.error("Tag cannot be empty", {
        duration: 2000,
        className: "bg-red-400",
        position: "top-right",
      });
    }

    account.tags.push(tag.value);
    setTags([...tags, tag.value]);

    tag.value = "";

    toast.success("Tag added", {
      duration: 1500,
      className: "bg-green-400",
      position: "top-right",
    });
  };

  const removeTagHandler = (tag: number) => {
    setTags(tags.filter((_, i) => i !== tag));
  };

  return (
    <>
      <div className="fixed inline-flex top-0 left-56 h-14 w-screen overflow-auto bg-white">
        <div className="ml-3 w-96">
          <div className="relative border shadow-sm shadow-orange-200 rounded-md cursor-text">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <input
              name="Search"
              placeholder="Search..."
              className="w-96 py-2 pl-10 text-sm rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute ml-[270px] -mt-[775px] 2xl:ml-[270px] 2xl:-mt-[985px]">
        <div className="inline-flex mt-14">
          <h1 className="text-3xl font-extrabold text-gray-800">Accounts</h1>
          <button
            type="button"
            onClick={openModalAccount}
            className="font-semibold border rounded px-5 h-8 ml-5 mt-1 border-cyan-300 hover:border-cyan-500"
          >
            Add
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen.modalAccount}
        onRequestClose={closeModalAccount}
        className="h-[660px] w-96 bg-white rounded fixed top-[6%] left-[33%] 2xl:top-[15%] 2xl:left-[42%] transform animate-fade-down"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Accounts Modal"
      >
        <div className="max-w-md mx-auto p-5">
          <div className="inline-flex">
            <h1 className="text-2xl font-bold mb-4">Add Account</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 mt-2 ml-40 cursor-pointer"
              onClick={closeModalAccount}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              const username = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("username") as HTMLInputElement;
              const email = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("email") as HTMLInputElement;
              const password = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("password") as HTMLInputElement;
              const phone = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("phone") as HTMLInputElement;
              const notes = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("notes") as HTMLTextAreaElement;

              account.username = username.value;
              account.email = email.value;
              account.password = password.value;
              account.phone = phone.value;
              account.notes = notes.value;

              closeModalAccount();
              openModalAccountID();
            }}
          >
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="h-8 w-full rounded mb-3 border px-2"
              name="username"
              placeholder="Username"
            />

            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="h-8 w-full rounded mb-3 border px-2"
              name="email"
              placeholder="Email"
            />

            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="h-8 w-full rounded mb-3 border px-2"
              name="password"
              placeholder="Password"
              required
            />

            <label className="block text-sm font-bold mb-2">Phone</label>
            <input
              type="tel"
              className="h-8 w-full rounded mb-3 border px-2"
              name="phone"
              placeholder="Phone"
            />

            <label className="block text-sm font-bold mb-2">Notes</label>
            <textarea
              className="h-28 w-full rounded mb-3 border px-2 resize-none p-2"
              name="notes"
              placeholder="Notes"
            ></textarea>

            <label className="block text-sm font-bold mb-2">Tags</label>
            <div className="inline-flex">
              <input
                type="text"
                className="h-8 w-28 rounded mb-3 border px-2"
                name="tags"
                maxLength={12}
              />
              <button
                type="button"
                className="ml-2 h-8 w-16 font-medium rounded border border-cyan-400 hover:border-cyan-600"
                onClick={addTagHandler}
              >
                Add tag
              </button>

              <button
                type="button"
                onClick={openModalTags}
                className="ml-5 mt-0.5 border rounded-full w-fit h-fit px-1 hover:border-gray-400"
              >
                <span className="font-bold">{tags.length}</span> tags added
              </button>
            </div>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mt-6"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen.modalTags}
        onRequestClose={closeModalTags}
        className="h-[220px] w-96 bg-white rounded fixed top-[30%] left-[33%] 2xl:top-[35%] 2xl:left-[40%] transform animate-fade-down"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Accounts Modal"
      >
        <div className="inline-flex">
          <h1 className="text-2xl font-bold m-3">Tags</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mt-4 ml-64 cursor-pointer"
            onClick={closeModalTags}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <ul className="list-inside ml-4 mt-3 list-none flex flex-wrap">
          {tags.map((tag, i) => (
            <li key={i} className="mr-2 mb-2">
              <span
                onClick={() => removeTagHandler(i)}
                className="bg-gray-200 px-2 py-1 rounded-full hover:bg-red-400"
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        isOpen={modalIsOpen.modalAccountID}
        onRequestClose={closeModalAccountID}
        className="h-[220px] w-96 bg-white rounded fixed top-[30%] left-[33%] 2xl:top-[35%] 2xl:left-[40%] transform animate-fade-down"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Accounts Modal"
      >
        <div className="max-w-md mx-auto p-5">
          <div className="inline-flex">
            <h1 className="text-2xl font-bold mb-4">Add Account</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 mt-2 ml-40 cursor-pointer"
              onClick={closeModalAccount}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();

              const id = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("id") as HTMLInputElement;

              accountId = id.value;

              closeModalAccountID();

              toast.success("Account added!", {
                duration: 2000,
                className: "bg-green-400",
                position: "top-right",
              });
            }}
          >
            <label className="block text-sm font-bold mb-2">
              Account ID (unique, to identify it)
            </label>
            <input
              type="text"
              className="h-8 w-full rounded mb-3 border px-2"
              name="id"
              placeholder="YouTube Account"
              required
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AccountsPage;
