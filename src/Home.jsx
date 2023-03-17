import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Home() {
  return (
   <div className="homemain"> <div className="home"><div><Login/></div><div><Signin/></div></div></div>
    
  );
}


function Login() {
  const navigate=useNavigate()
const [formstate,setformstate]=useState("success")

  const formik = useFormik({
    initialValues: {
      username:'',
      password:''
    },
    // validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      // console.log(values)

  const data=  await fetch("https://tasty-sweater-tuna.cyclic.app/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if(data.status===400){
console.log("error");
setformstate("error")
      }else{
        setformstate("success")
        const result= await data.json()
        console.log("success",result);
        localStorage.setItem("token",result.token)
        navigate("/movies")
      }
      
    }
  });
  return (
    <form onSubmit={formik.handleSubmit} className='loninform'>
       <h2>login</h2>
       <div className='loninfield'>
       <TextField
       name='username'
        value={formik.values.username}
        onChange={formik.handleChange}
        label="username"
        variant="outlined" />
       <TextField 
        value={formik.values.password}
        onChange={formik.handleChange}
        label="password" 
        name="password" 
        variant="outlined" />
       <Button color={formstate} type='submit' variant="contained">{formstate==="success"?"submit":"retry"}</Button>
       </div>

       </form>
    
    
  );
}


function Signin() {
  const navigate=useNavigate()
const [formstate,setformstate]=useState("success")

  const formik = useFormik({
    initialValues: {
      username:'',
      password:''
    },
    // validationSchema: formValidationSchema,
    onSubmit: (newdata) => {
      // console.log(values)
      adddata(newdata)
    }
  });

  const adddata= (newdata)=>{
    console.log(newdata)

       fetch("https://tasty-sweater-tuna.cyclic.app/users/signup",{
        method:"POST",
      body:JSON.stringify(newdata),
    headers:{
      "content-type":"application/json"
    }
       })
       navigate("/")
     };
  return (
    <form onSubmit={formik.handleSubmit} className='loninform'>
       <h2>signup</h2>
       <div className='loninfield'>
       <TextField
       placeholder="username"
       name='username'
        value={formik.values.username}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        label="username"
        variant="outlined" />
       <TextField 
       placeholder="password"
        value={formik.values.password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        label="password" 
        name="password" 
        variant="outlined" />
       <Button color="success" type='submit' variant="contained">submit</Button>
       </div>

       </form>
    
    
  );
}

