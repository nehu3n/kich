import SideBarComponent from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <SideBarComponent />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mt-5 ml-3">Accounts</h1>
      </div>
    </div>
  );
};

export default App;
