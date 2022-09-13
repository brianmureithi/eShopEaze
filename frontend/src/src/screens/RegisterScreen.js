import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = props.location.search? 
    props.location.search.split('=')[1]: '/';
   
    const userRegister =  useSelector((state) => state.userRegister);
    const { userInfo, loading, error } =userRegister;
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
           alert('Ensure password and confirm passsword match')
            
        }else{
            dispatch(register(name, email, password));
        }
   
    };
    useEffect(()=>{
      if(userInfo){
          props.history.push(redirect);
      }  

    },[props.history,redirect,userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>

                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name"> Name</label>
                    <input type="text"
                     id="name" 
                     placeholder="Enter Name" 
                     required 
                    onChange={(e) => setName(e.target.value)}/> 
                </div>
                <div>
                    <label htmlFor="email"> Email</label>
                    <input type="email"
                     id="email" 
                     placeholder="Enter Email" 
                     required
                    onChange={(e) => setEmail(e.target.value)}/> 
                </div>
                <div>
                    <label htmlFor="password"> Password</label>
                    <input type="password"
                     id="password" 
                     placeholder="Enter Password" 
                     required
                    onChange={(e) => setPassword(e.target.value)}/> 
                </div>
                <div>
                    <label htmlFor="confirmPassword"> Confirm Password</label>
                    <input type="password"
                     id="confirmpassword" 
                     placeholder="Confirm Password" 
                     required
                    onChange={(e) => setConfirmPassword(e.target.value)}/> 
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Create account</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
                
            </form>
            <br/>
        </div>
    );
}
