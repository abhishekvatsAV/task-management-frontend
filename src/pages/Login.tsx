import { FormEvent, useState } from "react";
// import { BackendUrl } from "@/helper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/Auth";
import { handleLoginApi } from "../utility/api";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await handleLoginApi(email, password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate("/");
        return;
      }
    } catch (error) {
      // TODO toast for failed to login
      console.log("error in login : ", error);
      return;
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#7C43F6] to-[#D992EA] flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg font-didact">
        <div className="mb-4 text-sm">
          <p>
            Not registered?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline font-bold">
              Sign up
            </Link>
          </p>
        </div>
        <h1 className="text-3xl font-semibold mb-4 text-black">Log in</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* <!-- Your form elements go here --> */}
          <div>
            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#7C43F6] rounded-3xl text-white p-2 hover:bg-[#D992EA] focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
