import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from 'firebase/firestore'
import { usersRef } from "../firebase/Firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";




const Login = () => {

    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/')
                } else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }


    return (
        <div>

            <section class="text-gray-600 body-font ">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">LOG IN</h1>

                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex-col flex-wrap -m-2">
                            <div class="px-2 w-full">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-green-500">Name</label>
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
                                    placeholder='lightiskira' type="password" id="password" name="email" class="w-full bg-blue-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-green-500">Mobile</label>
                                    <input 
                                    value={form.mobile}
                                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                    placeholder='9048544897' type="number" id="mobile" name="email" class="w-full bg-blue-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 md:flex  justify-between w-full">
                                <button onClick={()=>login()} class="flex  text-white bg-transparent border-2 border-green-500 py-2 px-8 focus:outline-none hover:bg-white hover:text-green-500 rounded text-lg">
                                    {loading ? <TailSpin height={25} /> : "Proceed"}</button>
                                <p className='text-white'>
                                    Don't have an account ?&nbsp;

                                    <Link to={"/signup"}>
                                        <span className='text-blue-500'>
                                            Sign Up
                                        </span>
                                    </Link>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login
