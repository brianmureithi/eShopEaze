import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch,useSelector} from 'react-redux';
import { signin } from '../actions/userActions';

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = props.location.search? 
    props.location.search.split('=')[1]: '/';
   
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } =userSignin;
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
    };
    useEffect(()=>{
      if(userInfo){
          props.history.push(redirect);
      }  

    },[props.history,redirect,userInfo]);
    return (
        <div className='w-full mt-8'>
            <form className=" md:w-[60rem] mx-auto py-4 px-2" onSubmit={submitHandler}>
                <div className='flex flex-col mb-4 text-center'>
                    <h1 className='text-4xl'>Sign In</h1>

                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div className='flex flex-col mb-4'>
                    <label className='mb-4 text-2xl font-[500]'htmlFor="email"> Email Address</label>
                    <input type="email"
                     id="email" 
                     placeholder="Enter Email" 
                     required
                    onChange={(e) => setEmail(e.target.value)}/> 
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="password" className='mb-4 text-2xl font-[500]'> Password</label>
                    <input type="password"
                     id="password" 
                     placeholder="Enter Password" 
                     required
                    onChange={(e) => setPassword(e.target.value)}/> 
                </div>
                <div className='flex flex-col mb-4'>
                    <label className='mb-4 text-2xl font-[500]'/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div className='flex flex-col mb-4'>
                    <label/>
                    <div>
                        New Here?{' '}
                        <Link to={`/register?redirect=${redirect}`}>Create Account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
