import React from 'react'
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { animeRef } from '../firebase/Firebase';
import swal from 'sweetalert';
import { Appstate } from "../App";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const useAppstate = useContext(Appstate);
    const navigate=useNavigate();
    //form stores data filled in addmovie form
    const [form,setForm]=useState({
        title:"",
        year:"",
        description:"",
        image:"",
        rating:0,
        totalReviews:0,
        });
    
    const [loading,setLoading] = useState(false);
    
    //function for adding an anime in anime collection
    const addAnime =async()=>{
        setLoading(true);
    try {
        //if user is logged in then only he can add anime otherwise show the login screen
      if(useAppstate.login) {
        await addDoc(animeRef, form);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        setForm({
          title: "",
          year: "",
          description: "",
          image: "",
          rating:0,
          totalReviews:0,
          
        })
      } else {
        navigate('/login')
      }
    } catch(err) {
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
    }

    return (
        <div>
            <section class="text-white body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">ADD ANIME</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="">
                                    <label for="name" class="leading-7 text-sm text-green-500">Title</label>
                                    <input 
                                    value={form.title}
                                    onChange={(e)=>setForm({...form,title:e.target.value})}
                                    type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors h-10 duration-200 ease-in-out"/>
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="">
                                    <label for="email" class="leading-7 text-sm text-green-500">Year</label>
                                    <input type="email" id="email" name="year" 
                                    value={form.year}
                                    onChange={(e)=>setForm({...form,year:e.target.value})}
                                    
                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 h-10 leading-8 transition-colors duration-200 ease-in-out"/>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="">
                                    <label for="message" class="leading-7 text-sm text-green-500">Image URL</label>
                                    <textarea id="message" name="message" 
                                    value={form.image}
                                    onChange={(e)=>setForm({...form,image:e.target.value})}

                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-10 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-green-500">Description</label>
                                    <textarea id="message" name="message" 
                                    value={form.description}
                                    onChange={(e)=>setForm({...form,description:e.target.value})}

                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addAnime} class="flex mx-auto text-white bg-transparent border-2 border-green-500 py-2 px-8 focus:outline-none hover:bg-white hover:text-green-500 rounded text-lg">
                                    {loading?<TailSpin height={25}/>:"Submit"}</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie
