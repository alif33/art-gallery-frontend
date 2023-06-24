import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Auth from "./helpers/Auth";
import UserList from "./pages/UserList";
import Artist from "./pages/Artist";
import Arts from "./pages/Arts";
import FunFacts from "./pages/FunFacts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth><UserList /></Auth>} />
        <Route path="/artists" element={<Auth><Artist /></Auth>}/>
        <Route path="/arts" element={<Auth><Arts /></Auth>}/>
        <Route path="/funfacts" element={<Auth><FunFacts /></Auth>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
