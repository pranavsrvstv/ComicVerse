import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import { TailSpin } from 'react-loader-spinner';
import app from '../firebase/Firebase';
import swal from 'sweetalert';

import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth = getAuth(app);

const Signup = () => {
    const navigate = useNavigate();
    //form stires the info filled in signup form fields -name ,mobile and password
    const [form, setForm] = useState([{
        name: "",
        mobile: "",
        password: ""
    }

    ]);

    const [loading, setLoading] = useState(false);
    //otpSent state changes when otp is sent successfully
    const [otpSent, setOtpSent] = useState(false);
    //OTP stores OTP entered by user
    const [OTP, setOTP] = useState("");

    //function to generate Recaptha -invisible
    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }


    //function that is called when user clicks on request OTP button
    const requestOtp = () => {
        //console.log(form.name,form.password,form.mobile);

        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            //showing an alert when OTP is sent successfully by sweetalert
            swal({
              text: "OTP Sent",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setOtpSent(true);
            setLoading(false);
          }).catch((error) => {
            console.log(error)
          })
    }

    //function that verifies the otp when user click on verify OTP button
    const verifyOTP = () => {
        try {
          setLoading(true);
          window.confirmationResult.confirm(OTP).then((result) => {
            //calling uploadData that uploads data of the signup form in firebase users Collection
            uploadData();
            swal({
              text: "Sucessfully Registered",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            //navigate to login page if user is successfully signed up 
            navigate('/login')
            setLoading(false); 
          })
        } catch (error) {
          console.log(error);
        }
      }
      //function that upload data in users collection 
      const uploadData = async () => {
        try {
          //function that stores the password entered by the user in a form of hash so that only the user knows his password
          const salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(form.password, salt);
          //console.log(form.name,hash,form.mobile);

          //adding userdata in users Collection using a reference to it (exported from Firebase.js)
          await addDoc(usersRef, {
            name: form.name,
            password: hash,
            mobile: form.mobile
          });
        } catch(err) {
          console.log(err);
        }
      }

    return (
        <div>

            <section class="text-gray-600 body-font ">
                <div class="container px-5 py-24 mx-auto">

                    <div class="flex flex-col text-center w-full mb-10">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">SIGN UP</h1>

                    </div>
                    {!otpSent ?
                        <>
                            <div class="lg:w-1/2 md:w-2/3 mx-auto">
                                <div class="flex-col flex-wrap -m-2">
                                    <div class="px-2 w-full">
                                        <div class="relative">
                                            <label 
                                            for="name" class="leading-7 text-sm text-green-500">Name</label>
                                            <input 
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder='L Lawliet' type="text" id="name" name="name" class="w-full bg-blue-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>

                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="email" class="leading-7 text-sm text-green-500">Password</label>
                                            <input 
                                            
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            placeholder='lightiskira' type={"password"} id="password" name="passwprd" class="w-full bg-blue-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="email" class="leading-7 text-sm text-green-500">Mobile</label>
                                            <input
                                            value={form.mobile}
                                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                            placeholder='9048544897' type="number" id="mobile" name="mobile" class="w-full bg-blue-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 mx- w-full">
                                        <button onClick={()=>requestOtp()} class="flex mx-auto  text-white bg-transparent border-2 border-green-500 py-2 px-8 focus:outline-none hover:bg-white hover:text-green-500 rounded text-lg">
                                            {loading ? <TailSpin height={25} /> : "Request OTP"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <div className='mt-0  '>
                            <div class="h-96 text-green-500 md:py-10 md:px-3 border-2 border-green-500 md:mx-80 hover:shadow-green-500 shadow-2xl">
                                <div class="container mx-auto">
                                    <div class="max-w-sm mx-auto md:max-w-lg">
                                        <div class="w-full">
                                            <div class="h-64 py-3 rounded text-center">
                                                <h1 class="text-2xl font-bold">OTP Verification</h1>
                                                <div class="flex flex-col mt-4">
                                                    <span>Enter the OTP you received </span>
                                                    {/* <span class="font-bold">+91 ******876</span> */}
                                                </div>

                                                <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                                                    <input
                                                        value={OTP}
                                                        onChange={(e) => setOTP(e.target.value)}
                                                        class="m-2 border h-10 w-1/2 text-black text-center form-control rounded" type="number" id="first" maxlength="10" />

                                                </div>

                                                <div class="flex justify-center text-center mt-5">
                                                    <button onClick={()=>verifyOTP()} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span  class="font-bold">CONFIRM OTP </span><i class='bx bx-caret-right ml-1'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                    }

                </div>
                <div id="recaptcha-container"></div>
            </section>

        </div>
    )
}

export default Signup
