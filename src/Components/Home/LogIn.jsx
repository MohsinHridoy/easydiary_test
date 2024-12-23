import { useContext, useState } from "react";
import logo1 from "../../assets/images/logo/bd-logo.png";
import logo2 from "../../assets/images/logo/easy-diary.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const LogIn = () => {
  const { signIn } = useContext(AuthContext);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in both email and password.",
      });
      setLoading(false);
      return;
    }
  
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }
  
    signIn(email, password)
      .then((result) => {
        // Fetch the user data (this comes from Firestore)
        const userData = result.userData; // Get the userData returned from signIn function
  
        if (keepLoggedIn) {
          // Save the JWT token and user data in localStorage
          localStorage.setItem("jwt_token", result.user?.accessToken);
          localStorage.setItem("user", JSON.stringify({ ...result.user, ...userData }));
        }
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
      })
      .finally(() => setLoading(false));
  };
  

  return (
    <div className="hero bg-base-200 min-h-screen ">
      <div className="hero-content flex-col lg:flex-row justify-around gap-20">
        <div className="flex items-center">
          <img src={logo1} alt="Government Logo" className="h-40 w-auto lg:block hidden" />
        </div>
        <div className="h-80 w-[2px] bg-green-700 mx-8 rounded-md lg:block hidden"></div>
        <div>
          <div className="flex flex-col items-center space-y-6">
            <img src={logo2} alt="Easy Diary Logo" className="h-40 w-auto" />
            <form onSubmit={handleLogin} className="w-64 space-y-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex justify-between items-center  ">
                <label>
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                  />
                     Keep me logged in
                </label>
                <NavLink to="/forgot-password" className="text-sm text-red-500 hover:underline">
                  Forgot Password?
                </NavLink>
              </div>

              <div className="justify-between items-center flex">
                <p>Don't have an account yet?</p>
                <NavLink to="/registration" className="underline">
                  Sign Up
                </NavLink>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-10 py-2 text-white rounded-full font-semibold ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
                }`}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
