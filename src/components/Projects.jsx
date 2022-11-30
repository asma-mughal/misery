import React from 'react'
import { projects1 } from '../constants/constants';
import { clock} from '../assets/index';
import styles from '../style';
import Button from './Button';
import { useNavigate} from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';
const Projects = ({campaign,setCampaign}) => {
    const Card = ({item}) =>{
        return(<>
          <div  id="projects"  name="projects" class="flex w-full py-5 pr-5 pl-5 lg:pl-0 md:pl-0 lg:mx-16
          transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300
          md:mx-16 sm:mx-16 xs:mx-8 ">
            <div className=''>
                <div class="max-w-xs h-full  flex flex-col justify-between bg-white dark:bg-gray-800 
                rounded-xl
                border border-gray-400 mb-6">
                    <img class="object-fit object-center rounded-t-lg"
                            src={item.img} alt="blog" />
                    <div className='px-3 py-3'>
                        <h2 tabindex="0" class="focus:outline-none text-black 
                        dark:text-gray-100 font-bold text-lg mb-0.5 font-poppins"
                        
                        >{item.name}</h2>
                        <p tabindex="0"  className={`${styles.paragraph} text-gray-400 max-w-[470px] `}>
                           Campaign by {item.campaignBy} </p>
                           <div class="flex flex-row ">
  <div className='pr-24'><text className={`${styles.paragraphDark} max-w-[470px]`}>Raised: {item.Raised} ETH</text></div>
  <div className={`${styles.paragraphDark} max-w-[470px] px-1.5`}>Goal {item.Goal} ETH</div>
</div>
<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-5">
    <div class="bg-secondary text-xs font-medium text-blue-100 text-center p-0.5 
    leading-none rounded-full" style={{
       width:`${item.progress}%`
    }}><text className='font-poppins text-white'> {item.progress}%</text></div>
  </div>
<div class="flex flex-row ">
  <div className='flex flex-row pr-24'>
    <img src={clock}  className="h-4 w-4 mt-1.5 mr-1"/>
    <div className={`${styles.paragraphDark} text-gray-500 max-w-[470px]`}>{item.days} Days Left</div>
  </div>
 
  <div className='text-transparent'>
  <Button 
    text='Donate'
    width="80px"
    height="10px"
    padding="15px"
    disabled="false"
    />
  </div>

</div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
       )
       }
       var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
       //autoplay:true,
       arrows: false,
     
      };
       const navigate = useNavigate();
       const handleClick = (i) =>{
        setCampaign(i)
        navigate("/projPage")
       }
  return (
    <div name="projects" id="projects">
    <Slider {...settings}
    style={{
      backgroundColor:'white'
    }}
    >
      
      {projects1.map((i)=>{
        return(
          <div class="grid grid-cols-1 sm:grid-cols-1
           md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5 bg-white">
          <div class=" w-full lg:w-full lg:flex  ">
          <img
                className="object-cover w-full
                h-80
                lg:w-96 lg:h-96"
                src={i.img}
                alt="image"
            />
            <div class="
              bg-white items-center lg:w-1/2 lg:ml-10 flex flex-col 
              font-poppins
              justify-center leading-normal">
              <div class="m-10">
                
                <div class="text-secondary font-bold text-xl uppercase  
                hover:underline m-4 lg:m-0 xl:m-0
                "
                
                >{i.name}</div>
                <div class="text-gray-900 font-bold text-base  m-4   lg:m-0 xl:m-0 mb-2">Campaign By: {i.campaignBy}</div>
                <div class="text-gray-900 font-normal text-base lg:m-0 xl:m-0 m-4   mb-2">
                {i.detail}
                </div>
                <div class="flex flex-row m-5 lg:m-0 xl:m-0">
  <div className=' w-full'><text className={`${styles.paragraphDark} max-w-[470px]`}>Raised: {i.Raised} ETH</text></div>
  <div className={`${styles.paragraphDark} 
   flex justify-end max-w-[470px] px-1.5 w-full`}>Goal: {i.Goal} ETH</div>
</div>
                <div class=" w-50 m-5 lg:m-0 xl:m-0 bg-gray-200 rounded-full dark:bg-gray-700 mb-5">
    <div class="bg-secondary text-xs font-medium text-blue-100 text-center p-0.5 
    leading-none rounded-full" style={{
       width:`${i.progress}%`
    }}><text className='font-poppins text-white'> {i.progress}%</text></div>
  </div>
                <div class="flex flex-row m-5  xl:m-0 ">
  <div className='flex flex-row w-full'>
    <img src={clock}  className="h-4 w-4 mt-1.5 mr-1"/>
    <div className={`${styles.paragraphDark} text-gray-500 max-w-[470px]`}>{i.days} Days Left</div>
  </div>
 
  <div className='text-transparent'>

    <button 
            onClick= {()=>{handleClick(i)}}
            class="bg-secondary border-secondary w-full font-poppins rounded-3xl border p-2
            text-white transition font-bold">
  Donate
</button>
  </div>

</div>
              </div>
            </div>
          </div>
          </div>
    )
      })}
    
    
  </Slider>
  </div>
  )
}

export default Projects
