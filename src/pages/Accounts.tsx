function AccountsPage() {
  return (
    <>
      <div className="fixed inline-flex top-0 left-56 h-14 w-screen overflow-auto bg-white">
        <div className="ml-3 w-96">
          <div className="relative border shadow-sm shadow-orange-100 rounded-md">
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
      <div className="absolute ml-[270px] -mt-[775px]">
        <div className="inline-flex mt-14">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Accounts
          </h1>
          <button
            type="button"
            className="font-semibold border rounded px-5 h-8 ml-5 mt-1 border-cyan-300 hover:border-cyan-500"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AccountsPage;
