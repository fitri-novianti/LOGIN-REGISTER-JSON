import React from "react";
import loginImg from "../../login.svg";
import axios from 'axios'

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

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    username: null, 
    password: null,
    post: [],
    formErrors: {
      username: "",
      password: ""
    }
  }
}

componentDidMount (){
  axios.get('https://jsonplaceholder.typicode.com/posts')
  .then( response => {
    console.log (response)
  })
  .catch(error =>{
    console.log(error)
  })
}

handleSubmit = e => {
  e.preventDefault()

  if (formValid(this.state)) {
    console.log(`
      --SUBMITTING--
      Username: ${this.state.username}
      Password: ${this.state.password}
    `);
    
  } else {
    console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  }
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
    case "password":
      formErrors.password =
        value.length < 6 ? "minimum 6 characaters required" : "";
      break;
    default:
      break;
  }
  this.setState({ formErrors, [name]: value }, () => console.log(this.state));
}


  render() {
    const { formErrors } = this.state;

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header1">Login</div>
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
          </div>
          <a href="#" id="forgot">Forgot Password?</a>

        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        </form>
        </div>
        
        
      </div>
    );
  }
}