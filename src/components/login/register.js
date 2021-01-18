import React from "react";
import loginImg from "../../login.svg";
import axios from 'axios'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
}

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null, 
      email: null, 
      password: null,
      // confirmPassword: null,
      formErrors: {
        username: "",
        email: "",
        password: "",
        // confirmPassword: "",
        
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Username: ${this.state.username}
        Email: ${this.state.email}
        Password: ${this.state.password}
    
      `);
    alert ('Anda berhasil membuat akun. Silakan login')  
    axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
   
  } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    // if ((this.state.confirmPassword)!==(this.state.password)) {
    //   console.log ("passwords don't match")
    // }
    //  else {
    //    console.log("password match")}
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    
    let formErrors = { ...this.state.formErrors };
   

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;  
      //  case "confirmPassword":
      //   formErrors.confirmPassword = 
      //     value.length < 6 ? "minimum 6 characaters required" : "";  
      //     formErrors.confirmPassword =((this.state.password)==(this.state.confirmPassword))?
      //     "passwords don't match":"password sama"
      //     break
        case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
     ;  
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">        
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
              type="text" 
              name="username" 
              className={formErrors.username.length > 0 ? "error" : null}
              placeholder="Enter your username"
              noValidate 
              onChange={this.handleChange} 
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              name="email" 
              className={formErrors.email.length > 0 ? "error" : null}
              placeholder="Enter your email"
              noValidate 
              onChange={this.handleChange} />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
              type="password" 
              name="password" 
              className={formErrors.password.length > 0 ? "error" : null}
              placeholder="Enter your password" 
              noValidate 
              onChange={this.handleChange} 
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            {/* <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input 
              type="password" 
              name="confirmPassword" 
              className={formErrors.confirmPassword.length > 0 ? "error" : null}
              placeholder="Confirm your password"
              noValidate 
              onChange={this.handleChange} />
              {formErrors.confirmPassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmPassword}</span>
              )}
            </div> */}
          </div>
          <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
          </div>
        </form>
        </div>
      </div>

    );
  }
}