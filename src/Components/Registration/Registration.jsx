import { useForm } from "react-hook-form";
import logo1 from "../../assets/images/logo/bd-logo.png";
import logo2 from "../../assets/images/logo/easy-diary.png";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 for messages

const Registration = () => {
  const { createUser } = useContext(AuthContext); // Correct context usage
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true); // Set loading state during registration

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("User registered:", loggedUser);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have successfully created your account!",
        });

        setLoading(false); // Clear loading after success

        // Redirect to dashboard
        navigate("/dashboard"); // Replace "/dashboard" with your desired route
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });

        setLoading(false); // Clear loading after failure
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row justify-around gap-10">
        <div className="flex items-center">
          <img
            src={logo1}
            alt="Government Logo"
            className="h-40 w-auto lg:block hidden"
          />
        </div>

        {/* Divider */}
        <div className="h-80 w-[2px] bg-green-700 mx-8 rounded-md lg:block hidden"></div>

        <div>
          {/* Right Section */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src={logo2}
              alt="Easy Diary Logo"
              className="sm:h-40 md:h-32 lg:h-24 w-auto"
            />
            <h2 className="text-xl font-bold text-green-700">Create New Account</h2>

            {/* Form */}
            < form onSubmit={handleSubmit(onSubmit)} className=" w-[550px] space-y-4" >
              <div className="flex gap-4 ">
                <div>
                  {/* Name */}
                  <label>
                     Enter your name
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Username"
                      className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none my-1"
                    />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                  </label>
                </div>
                <div>
                  {/* Email */}
                  <label>
                     Enter your Email
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email"
                      className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none my-1"
                    />
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                   {/* Designation */}
                   <label>
                     Enter your Designation
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Designation"
                      className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none my-1"
                    />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                  </label>
                </div>
                <div>
                  {/* Branch */}
                  <label>
                     Enter your Branch number
                   
                      <select name="Branch" id="Branch" className="border-2 border-green-700 m-auto my-1">
                        <option value="b1">1 </option>
                        <option value="b2">2</option>
                        <option value="b3">3</option>
                        <option value="b4">4</option>
                      </select>
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  {/* Password */}
                  <label>
                     Enter your password
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      placeholder="Password"
                      className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none my-1"
                    />
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                  </label>
                </div>
                <div>
                  {/* Confimr Password */}
                  <label>
                      Confirm your password
                    <input
                      type="password"
                      {...register("  password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      placeholder=" Confirm Password"
                      className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none my-1"
                    />
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                  </label>
                </div>
              </div>
              


              {/* Date of Birth */}
              <label>
                 Enter your date of birth
                <input
                  type="date"
                  {...register("calender", { required: "Date of birth is required" })}
                  className="w-full px-4 py-2 border-2 border-green-700  focus:outline-none my-1"
                />
                {errors.calender && <p className="text-red-600">{errors.calender.message}</p>}
              </label>

              {/* Already Registered */}
              <div className="justify-between items-center flex">
                <p>Already Registered?</p>
                <NavLink to="/">
                  <p className="underline">Sign In</p>
                </NavLink>
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                value={loading ? "Signing Up..." : "Sign Up"}
                disabled={loading}
                className="px-10 py-2 text-white bg-green-700 rounded-full font-semibold hover:bg-green-800"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
