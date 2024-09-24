import { useNavigate } from "react-router-dom";
import "../styles/register.scss"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../redux/slices/dataSlice";
export default function Register() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  console.log(date);
  const OnHandleClick1 = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      window.alert("Password and Confirm Password are not same");
    } else {
      dispatch(RegisterUser({ ...formData, timedate: date }));
      window.alert("Successfully Registered");
    }
  };

  return (
    <div className="register-container-main">
      <div className="register-container">
        <div className="left">
          <div className="wallpaper">
            <img src="https://res.cloudinary.com/cliqtick/image/upload/v1684308943/create_user_ryynll.jpg" />
          </div>
        </div>

        <div className="right">
          <div className="right-upper">
            <div className="blacircle"></div>
            <div className="oraline"></div>
            <div className="oracircle"></div>
          </div>
          <div className="logo-container">
            <div className="logo">
              <img src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png" />
            </div>
          </div>
          <div className="register">
            <div className="form-item">
              <input
                className="invalu p-3"
                id="exampleDatetime"
                name="username"
                // placeholder="User Name"
                type="text" autoComplete="off" required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <label for="username">User Name</label>
            </div>

            <div className="form-item">
              <input
                id="Email"
                className="invalu p-3"
                name="email"
                // placeholder="Email "
                type="text"  autoComplete="off" required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label for="email">Email</label>

            </div>

            <div className="form-item">
              <input
                id="exampleNumber"
                className="invalu p-3"
                name="number"
                // placeholder="Phone"
                type="text"  autoComplete="off" required
                onChange={(e) =>
                  setFormData({ ...formData, mobilenumber: e.target.value })
                }
              />
              <label for="phone">Phone</label>

            </div>

            <div className="form-item">
              <input
                id="Password"
                className="invalu p-3"
                name="password"
                // placeholder="Password"
                type="password"  autoComplete="off" required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <label for="password">Password</label>

            </div>

            <div className="form-item">
              <input
                id="examplePassword"
                className="invalu p-3"
                name="confirmpassword"
                // placeholder="Confirm password"
                type="password"  autoComplete="off" required
                onChange={(e) =>
                  setFormData({ ...formData, confirmpassword: e.target.value })
                }
              />
              <label for="confirmpassword">Confirm Password</label>

            </div>
          </div>

          <div className="AlreadyRegis" onClick={OnHandleClick1}>
            <div>Please Login</div>
          </div>
          <div className="register-btn">
            <div>
              <button type="button" onClick={handleClick}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}