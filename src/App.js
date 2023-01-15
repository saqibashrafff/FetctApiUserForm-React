 
import './App.css';
import Success from './Components/success';
import axios from "axios";
import { useEffect, useState } from 'react';


function App() {

  const [Apidata, setApidata] = useState([]);
  const [isError, setisError] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [check, setcheck] = useState(false);

  const [Password, setPassword] = useState("");
  const [ConfirmPwd, setConfirmPwd] = useState("");
  
  var array  = [];
  var i = 0;

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      setApidata(res.data)
    })
    .catch((error) => {
      setisError(error.message)
    })
  },[]);


  function EmailChange(event){

    var EmailValue = event.target.value;

    setUserEmail(EmailValue);

  }

  function PasswordChange(event){

    var PasswordValue = event.target.value;

    setPassword(PasswordValue);

  }

  function CheckPassword(event){
    
    var Checkpassword = event.target.value;

    setConfirmPwd(Checkpassword);

  }

  function HandleClick(event){

    if (UserEmail == "" || Password == "" || ConfirmPwd == ""){
      alert("Please enter all your credentials");
      event.preventDefault();
    }
    else {

    event.preventDefault();

    Apidata.map((post) => {
      const {id, name,email} = post;    

      array[i] = email;
      i++; 

  })

  for (var y = 0; y <i; y++ ){ 
    if (array[y] == UserEmail){
      if (Password == ConfirmPwd){

        setcheck(true);
        setPassword("");
        setConfirmPwd("");
        setUserEmail("");
        return;
      }
      else {
        alert("Confirm your password again.");
        return;
      }
    }
  }
  alert("Email did not match with the Api's");
  }

}

  return (
    <>
    <div className='LoginSection' >
      <h1>Create New Password</h1><br></br>
      <form onSubmit={HandleClick} >
      <input value={UserEmail} type={"email"} onChange={EmailChange} placeholder="Email" ></input><br></br>
      <input value={Password} type={"password"} onChange={PasswordChange} placeholder="Password" ></input><br></br>
      <input value={ConfirmPwd} type={"password"} onChange={CheckPassword} placeholder="Confirm password" ></input><br></br>
      <button type={"submit"} >Reset Password</button>
      </form>
    </div>

    {check == true ? <Success/>: null}

    </>
  );

}

export default App;
