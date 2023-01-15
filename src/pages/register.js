import React,{useState,useContext, useEffect} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import Logo from "../assets/logoLogin.png";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import * as Yup from "yup";
import { AuthContext } from "../context/auth_context";
import axios from "axios"
import { Helmet } from "react-helmet";

const Root = styled.div`
//background:#27555726;

padding-top: 0px;
color:white;
min-height: calc(100vh - 60px);
display: flex;
flex-direction: column;
justify-content: center;

`;
const RootInner = styled.div`
width:480px;
align-self: center;
background: #ffffff;
padding: 15px 5px;
border-radius: 5px;
@media(max-width:425px){
  margin: 16px;
padding: 15px 5px;
width: 90%;
}
@media(min-width:426px) and (max-width:768px){
  margin: 16px;
  padding: 15px 5px;
  width:unset;
}
`;

const InputGrp = styled.div`
min-width: calc(100% /2 - 20px);
margin: 0px 10px;

padding-top: 0px;
color:white;
display: flex;
flex-direction: column;
`;
const InputGrpFlex = styled.div`
display: flex;
`;

const Label = styled.label`
color:#596876;
font-weight:bold;
`;
const LabelT = styled.label`
color:#596876;

margin-left: 10px;
`;

const Input = styled(Field)`
margin: 10px 0px;
padding: 15px 15px;
border-radius:5px;
border:none;
background:#4e5f612e;
`;




const ErrorText = styled.p`
color: #f44336;
    margin: 0px;
    font-size: 12px;
`;

const Button = styled.button`
padding: 5px 25px;
width: fit-content;

border:none;
background:#8bab50;
color:white;
border-radius:50px;
cursor:pointer;
margin: 15px ;
`;

const Heading = styled.div`
margin: 0px;
padding:0px;
color:white;
text-align:center;
`;

const ErrM = styled.h1`
margin: 0px;
padding-bottom: 10px;
color:#f44336;
text-align:center;
font-size: 14px;
`;


function Register() {
  const {auth,setAuth} = useContext(AuthContext)
  const navigate = useNavigate ()
 const [age, setAge] = useState("")
 const [errorM, setError] = useState("")


 

  const handleLogin =(values) =>{
    
    
    axios.post('https://api.sweetleaf.co.za/register',values)
    .then(function (response) {
      console.log("response.data",response.data)
      if(response.data.userRegisterSucces == false){
        setError(response.data.userRegisterMsg)
      }else{
        navigate(`${response.data.userRegisterMsg}`)
      }
      
      
    })
    .catch(function (error) {
  
      console.log(error);
    })
   

  }

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
      surname: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
      name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
      email: Yup.string()
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .required('Required'),
      age: Yup.bool()
      .isTrue('Required')
      .required('Required'),
  });

  
 
  
  return (
    <Root>

<Helmet>
        <meta charSet="utf-8" />
        <title>{`Sweet Leaf - Sign Up`}</title>
        <link rel="canonical" href={`https://sweetleaf.co.za/sign-up`} />
      </Helmet>

     <RootInner>
     <Heading>
     <img src={Logo} width="60%" />
    </Heading>
{errorM !== "" && <ErrM>{errorM}</ErrM>}
    <Formik
      initialValues={{
        userName: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        age: age,
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        handleLogin(values)
      }}
    >
      {({ errors, touched,handleSubmit,values }) => (
      <Form  >

      <InputGrp>
        <Label htmlFor="userName">UserName</Label>
        <Input id="userName" name="userName"  placeholder="Type Here" />
        {errors.userName && touched.userName ? (<ErrorText>{errors.userName}</ErrorText>) : null}

        </InputGrp>

       <InputGrpFlex>
       <InputGrp>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name"  placeholder="Type Here" />
        {errors.name && touched.name ? (<ErrorText>{errors.name}</ErrorText>) : null}

        </InputGrp>

        <InputGrp>
        <Label htmlFor="surname">Surname</Label>
        <Input id="surname" name="surname"  placeholder="Type Here" />
        {errors.surname && touched.surname ? (<ErrorText>{errors.surname}</ErrorText>) : null}

        </InputGrp>
       </InputGrpFlex>

       <InputGrpFlex>
        <InputGrp>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="Type Here" type="email"/>
        {errors.email && touched.email ? (<ErrorText>{errors.email}</ErrorText>) : null}
      </InputGrp>

        <InputGrp>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" placeholder="Type Here" type="password"/>
        {errors.password && touched.password ? (<ErrorText>{errors.password}</ErrorText>) : null}
      </InputGrp>
      </InputGrpFlex>

      <InputGrp>
      <label >
                  <Field
                    name="age"
                    id="age"
                    type="checkbox"
                  />
                  <LabelT>I am 18 years old</LabelT>
                </label>
      {errors.age && touched.age ? (<ErrorText>{errors.age}</ErrorText>) : null}
      </InputGrp>
  

      <Button type="submit">Sign Up</Button>
      </Form>
        )}
    </Formik>

    
        
     </RootInner>
    </Root>
  )
}

export default Register