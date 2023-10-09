import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Map from "../Map/Map";
import GetAllMuseums from "../Museums/GetAllMuseums";
import UserProfile from "../Users/UserProfile";
import Logout from "../Users/Logout";
import Auth from "../Users/Auth";
import Navbar from "./NavBar";
import GetSingleMuseum from "../Museums/GetSingleMuseum";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUsername,
  selectCurrentUserId,
} from "../../Redux/authSlice";
import AllReviews from "../Reviews/AllReviews";

export default function AppRouter() {
  const token = useSelector(selectCurrentToken);
  const username = useSelector(selectCurrentUsername);
  const userId = useSelector(selectCurrentUserId);

  return (
    <>
      <div>
        <Navbar token={token} />
      </div>
      <div>
        <Routes>
          {/* <h1>Hello world</h1> */}
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/museums" element={<GetAllMuseums />} />
          <Route
            path="/profile"
            element={
              <UserProfile token={token} username={username} userId={userId} />
            }
          />
          <Route path="/register" element={<Auth token={token} />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/museums/:museumId"
            element={<GetSingleMuseum token={token} userId={userId} />}
          />
          <Route path="/reviews" element={<AllReviews token={token} />} />
        </Routes>
      </div>
    </>
  );
}
