import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import "./App.css";
import UserForm from "./userForm.jsx";

function App() {
    return (
        <Router>
            <MainLayout />
            <Routes>
                <Route path="/user-form" element={<UserForm />} />
            </Routes>
        </Router>
    );
}

function Home() {
    return (
        <>
            <h1>React Assessment Test Project</h1>
            <div className="mt-lg-5">
                <h5 className="mb-4 details">Dynamic Form Builder to create a User Form</h5>
                <Link to="/user-form">
                    <button className="btn btn-primary">User Form</button>
                </Link>
            </div>
        </>
    );
}

function MainLayout() {
    const location = useLocation();

    return location.pathname === "/" ? <Home /> : null;
}

export default App;
