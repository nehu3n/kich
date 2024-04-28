import SideBarComponent from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <SideBarComponent />
      </div>
    </div>
  );
}

export default App;
