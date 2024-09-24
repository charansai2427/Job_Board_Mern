import { Form, useNavigate } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import "../styles/login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../redux/slices/dataSlice";
export default function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    console.log(dispatch(RegisterUser(formData)));
  };
  const OnHandleClick1 = (e) => {
    e.preventDefault();
    navigate("/admin/login")
  }
  return (
    <div className='login-container'>
    <div className='left'>
        <img src ="https://res.cloudinary.com/cliqtick/image/upload/v1684308943/create_user_ryynll.jpg"/>
        <button type='button' onClick={handleClick}>Register</button>
    </div>

    <div className='right' style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',columnGap:'2em',marginLeft:'20em',marginTop:'-25.5em'}}>
           <div style={{backgroundColor:'black',border:'2px solid  #f4b34a',borderRadius:'50px',height:'1em',width:'1em'}}></div>
           <div style={{width:'25em',height:'0.1em',backgroundColor:'rgb(244,179,74)'}}></div>
           <div style={{backgroundColor:'rgb(244,179,74)',borderRadius:'50px',height:'1em',width:'1em'}}></div> 
        </div>
        <br/>
        <img className="panda" src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"  style={{width:'11em',height:'12vh',marginLeft:'44.5em'}}/>

        <br/>

        <div className='form' onSubmit={handleClick} style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'0.5em',paddingLeft:'20%',paddingRight:'10%',paddingTop:'1%',marginLeft:'15em',columnGap:'0%'}}>
        {/* <Form > */}
      <FormGroup>
        <input
          id="exampleDatetime"
          name="username"
          placeholder="User Name"
          type="text" style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%'}}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        ></input>
      </FormGroup>

          <FormGroup>
          <input
           id="Email"
           name="email"
           placeholder="Email "
           type="email"  style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%'}}
           onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
           ></input>
          </FormGroup>

          <FormGroup>
        <input
          id="exampleNumber"
          name="number"
          placeholder="Phone"
          type="text" style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%'}}
          onChange={(e) =>
            setFormData({ ...formData, mobilenumber: e.target.value })
          }
        ></input>
      </FormGroup>


          <FormGroup>
        <input
          id="Password"
          name="password"
          placeholder="Password"
          type="password"
          style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%'}}
          
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          ></input>
      </FormGroup>

      <FormGroup>
        <input
          id="examplePassword"
          name="confirmpassword"
          placeholder="Confirm password"
          type="password" style={{width:'80%',height:'8vh',textAlign:'start',paddingLeft:'4%'}}
          onChange={(e) =>
            setFormData({ ...formData, confirmpassword: e.target.value })
          }
          ></input>
      </FormGroup>
       {/* </Form> */}
          </div>

<FormGroup check style={{paddingTop:'3em',marginLeft:'40em'}}>
        <Input type="checkbox" />
        <Label check style={{color:"rgb(244,179,74)",cursor:'pointer'}}>I here by agree to terms and conditions</Label>
      </FormGroup>
      <Label className="registers"onClick={OnHandleClick1} style={{marginLeft:'45em',cursor:'pointer',color:'rgb(244,179,74)'}}>Already Have An Account ? </Label>

</div>
)

}
