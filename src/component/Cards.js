import {  getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { animeRef } from '../firebase/Firebase';
import { Link } from 'react-router-dom';

const Cards = () => {

    const [data,setData]=useState([

    ]);
    const[loading,setLoading]=useState(true);
    

    useEffect(()=>{
        async function getData(){
            setLoading(true);
            //getting data of all the animes
            const _data= await getDocs(animeRef);
            //console.log(_data);
            _data.forEach((doc)=>{
                setData((prv)=>[...prv,{...(doc.data()),id:doc.id}]);
            })
            setLoading(false);
        }
        getData();
    },[]);

  return (
    <div className='flex flex-wrap justify-between p-3 mt-32'>
        
        {loading? 
        <div className=' w-full flex justify-center items-center h-96'>
            <InfinitySpin height={50}/>
            
        </div> 
        :data.map((e,i)=>{
        return (
        <Link to={`detail/${e.id}`}>
        <div key={i} className='min-w-[18%] min bg-gray-800 p-1 m-1 mb-5 font-medium mt-3 md:mt-0  hover:shadow-blue-500 shadow-2xl bg-blend-lighten hover:-translate-y-3 transition-all duration-500'>
        <img className=' h-52 w-48  hover:h-60 ' src={e.image} alt="DeathNote" />
        <h1></h1>
        <h1>{e.title}</h1>
        <h1>{e.year}</h1>
        <h1>
            <ReactStars
            size={30} value={e.rating} half={true} edit={false}
            />
        </h1>
        </div>
        </Link> 
        );
        })}
        
        
    </div>
  )
}

export default Cards
