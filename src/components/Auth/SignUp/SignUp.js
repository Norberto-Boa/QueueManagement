import React, { useState, useEffect } from 'react'
import './SignUp.css'
import Navbar from '../../Layout/Navbar/Navbar'
import { useForm } from 'react-hook-form'
import image from '../../Assets/queuimage.jpeg'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../../redux/actions/AuthAction'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../../services/API'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions'
const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        dispatch(setLoader())
        e.preventDefault();
        dispatch(actionCreators.userEmail(data.email));
        dispatch(actionCreators.userPass(data.password));
        localStorage.setItem("email", data.email);
        let obj={
            "email": data.email,
        }
        AuthService.Signup(obj)
        .then((res)=>{
            dispatch(UnsetLoader())
            console.log(res);
        }).catch((error)=>{
            dispatch(UnsetLoader())
            console.log(error);
        })
        navigate("/Detail");
    }
    const [toggle, setToggle] = useState(false);
    const [toggle1, setToggle1] = useState(false);
    const handleClicked = () => {
        navigate("/login");
    }
    return (<>
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>

            
                <div className='Main-heading'>
                    <p>TM at your service.<span className='ques'></span></p>
                </div>
                <div className='lg_form'>
                <form className='input-login' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-container'>
                        <div className='email'>
                            <input className='input-field' type="email" placeholder='Enter Email Address' name="email" {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9_\-]{4,}[@][a-z]{3,}[\.][a-z]{1,3}$/i, message: "This is not a valid email" } })}></input>
                            <p className='alerts'>{errors.email?.message}</p>
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className='password'>
                            <i id="passlock" class="fa fa-eye" aria-hidden="true"></i>
                            {
                                toggle ? <i id='passlock' class="fa fa-eye-slash" aria-hidden="true" onClick={() => { setToggle(!toggle) }}></i> : <i id="passlock" class="fa fa-eye" aria-hidden="true" onClick={() => { setToggle(!toggle) }}></i>
                            }
                            <input className='input-field' type={toggle ? "text" : "password"} placeholder='Enter New Password' name="password" {...register("password", { required: "password is required", minLength: { value: 8, message: "Password must be more than 8 characters" }, maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" } })}></input>
                            <p className='alerts'>{errors.password?.message}</p>
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className='cpassword'>
                            <i id="passlock" class="fa fa-eye" aria-hidden="true"></i>
                            {
                                toggle1 ? <i id='passlock' class="fa fa-eye-slash" aria-hidden="true" onClick={() => { setToggle1(!toggle1) }}></i> : <i id="passlock" class="fa fa-eye" aria-hidden="true" onClick={() => { setToggle1(!toggle1) }}></i>
                            }
                            <input className='input-field' type={toggle1 ? "text" : "password"} placeholder='Renter New Password' name="cpassword" {...register("cpassword", { required: "password is required", minLength: { value: 8, message: "Password must be more than 8 characters" }, maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" } })}></input>
                            <p className='alerts'>{errors.cpassword?.message}</p>
                        </div>
                    </div>
                    <button className='signup-btn' type='submit'>Sign Up Now</button>
                   

                </form>
                <div classname= 'sideright'> <p className='login-head'>Existing users <u onClick={handleClicked}>Login</u></p>
                </div>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="logo" />
            </div>
            
            </div>
        </>)
}
export default SignUp