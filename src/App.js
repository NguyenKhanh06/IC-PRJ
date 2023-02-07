import "./App.css";
// import logo from "./logo.svg";
// import Home from "./pages/students/Home";
// import Messenger from "./pages/chat/Messenger";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Router from "./routes/routes";
import { AuthContextProvider } from "./context/AuthContext";
// import Signin from "./pages/Signin";
// import Header from "./components/header/Header";
// import Admin from "./pages/admin/Admin";

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Router />
            </div>
        </AuthContextProvider>
    );
}

export default App;
