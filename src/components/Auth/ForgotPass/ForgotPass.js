import React, { useState, useEffect } from 'react'
import Navbar from '../../Layout/Navbar/Navbar'
import { useForm } from 'react-hook-form'
import image from '../../Assets/pic.svg'
import './ForgotPass.css'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../../services/API'
import Toaster from '../../Layout/Alerts/Alert'
import { toast } from 'react-toastify'
const Forgot = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });
    const navigate = useNavigate();
    const onSubmit = (data, e) => {
        e.preventDefault();
        localStorage.setItem("forgot", 1);
        let obj = {
            "username": data.email
        }
        localStorage.setItem("emailj", data.email);
        AuthService.forgot(obj)
            .then((res) => {
                console.log(res);
                navigate("/otp");
            }).catch((e) => {
                console.log(e);
                toast.error("Something is Wrong")
            })

    }
    return (
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <div className='middle-portion'>
                <div className='login-heading'>
                    <p>Enter your email <span className='ques'>.</span></p>
                </div>
                <form className='input-login' onSubmit={handleSubmit(onSubmit)}>
                    <div className='emailf'>
                        <input className='input-field' type="email" placeholder='Enter Email Address' name="email" {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9_\-]{4,}[@][a-z]{3,}[\.][a-z]{1,3}$/i, message: "This is not a valid email" } })}></input>
                        <p className='alerts'>{errors.email?.message}</p>
                    </div>
                    <button className='sendotp-btn' type='submit'>Send OTP</button>
                </form>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="logo" />
            </div>
            <Toaster />
        </div>
    )
}

export default Forgot