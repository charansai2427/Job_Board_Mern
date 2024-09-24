import { FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/login.scss";
import { LoginUser } from "../redux/slices/dataSlice";
import { useEffect, useState } from "react";
export default function Login() {
  const [formData001, setFormData001] = useState({});
  const loginUser = useSelector((state) => state.User.value.login);
  const { token } = loginUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick001 = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData001));
  };
  const handleClick2 = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);
  return (
    <div className="login-container-main">
      <div className="login-container">
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
          <div className="login">
            <div className="form-item">
              <input
                className="inpp p-3"
                id="exampleEmail"
                name="email"
                // placeholder="Email Address"
                type="text" autoComplete="off" required
                onChange={(e) =>
                  setFormData001({ ...formData001, email: e.target.value })
                } 
              />
              <label for="password">Login</label>
            </div>

            <div className="form-item">
              <input
                className="inpp p-3"
                id="Password"
                name="password"
                // placeholder="Login with Password"
                type="password" autoComplete="off" required
                onChange={(e) =>
                  setFormData001({ ...formData001, password: e.target.value })
                }
              />
              <label for="password">Password</label>

            </div>
            <div className="register text-warning" onClick={handleClick2}>
              <div>Create Account ? Register</div>
            </div>
            <div className="login-btn">
              <div>
                <button type="button" onClick={handleClick001}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}