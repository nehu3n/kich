import { useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";

function AccountsPage() {
  const [modalIsOpen, setIsOpen] = useState({
    modalAccount: false,
    modalAccountID: false,
  });

  let account = {
    username: "",
    email: "",
    password: "",
    phone: "",
    notes: [""],
    tags: [""],
  };

  // @ts-ignore
  let accountId: string;

  function openModalAccount() {
    setIsOpen({
      modalAccount: true,
      modalAccountID: false,
    });
  }

  function closeModalAccount() {
    setIsOpen({
      modalAccount: false,
      modalAccountID: false,
    });
  }

  function openModalAccountID() {
    setIsOpen({
      modalAccount: false,
      modalAccountID: true,
    });
  }

  function closeModalAccountID() {
    setIsOpen({
      modalAccount: false,
      modalAccountID: false,
    });
  }

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
              const tags = (
                e.currentTarget as HTMLFormElement
              ).elements.namedItem("tags") as HTMLInputElement;

              account.username = username.value;
              account.email = email.value;
              account.password = password.value;
              account.phone = phone.value;
              account.notes = [notes.value];
              tags.value.split(", ").forEach((tag) => {
                account.tags.push(tag);
              });

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
            <input
              type="text"
              className="h-8 w-full rounded mb-3 border px-2"
              name="tags"
              placeholder="tag1, tag2, tag3, tag4"
            />

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mt-3"
            >
              Add
            </button>
          </form>
        </div>
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
                className: "bg-green-200",
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
