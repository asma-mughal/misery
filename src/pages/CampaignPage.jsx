import React from 'react'
import { useNavigate } from 'react-router-dom'
import { clock } from '../assets'
import styles from '../style'
const CampaignPage = ({campaign}) => {
  const navigate = useNavigate();
  return (
    <div class="p-16">
<div class="bg-white shadow mt-20 font-poppins">
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
       
      </div>
      <div>
      </div>
          <div>
       
      </div>
    </div>
    <div class="relative">
      <div class="w-48 h-48 mx-auto 
       shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center ">
<img src={campaign.img} className=" h-48 w-48 rounded-lg"/>
      </div>
    </div>

    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
<button
  class="text-white py-2 px-4 uppercase rounded
   bg-transparent"
>
</button>
    <button
  class="text-white py-2 px-4
 uppercase rounded bg-transparent"
>
 
</button>
    </div>
  </div>

  <div class="text-center border-b mt-24">
    <h1 class="text-4xl font-medium text-black">{campaign.name} </h1>

    <p class="mt-8 text-gray-500">Campaign by - {campaign.campaignBy}</p>
    <div className='flex flex-row justify-center items-center'>
       <img src={clock} className="pr-3 mt-1"  />
          <p class="mt-2 text-gray-500">Days Left - {campaign.days}</p>
         
    </div>

    <div class="flex flex-row justify-center items-center">
  <div className='pr-32'><text className={`${styles.paragraphDark} max-w-[470px]`}>Raised: {campaign.Raised} ETH</text></div>
  <div className={`${styles.paragraphDark} max-w-[470px] px-1.5`}>Goal: {campaign.Goal} ETH</div>
</div>

<div class="flex mt-3 flex-row justify-center items-center">

<div class="w-80 bg-gray-200 rounded-full  dark:bg-gray-700 mb-5">
    <div class="bg-secondary text-xs font-medium text-blue-100 text-center p-0.5 
    leading-none rounded-full" style={{
       width:`${campaign.progress}%`
    }}><text className='font-poppins text-white '> {campaign.progress}%</text></div>
  </div>
  </div>
</div>
 
  </div>
 
  <div class="mt-5 flex flex-col justify-center">
    <p class="text-gray-600 text-center font-poppins font-light pb-10 lg:px-16">
      {campaign.detail}</p>
  <div class="space-x-8 flex justify-between     md:mt-0 md:justify-center">
<button
  class=" py-4  px-7 uppercase
  bg-secondary text-xs text-white  text-center p-0.5 
    leading-none rounded-full hover:bg-secondary shadow hover:shadow-lg 
   font-bold font-poppins transition transform hover:-translate-y-0.5"
>
 Donate
</button>
    <button
  class="py-4 px-7 uppercase
  bg-secondary text-xs text-white text-center p-0.5 
    leading-none rounded-full hover:bg-secondary shadow hover:shadow-lg 
   font-bold font-poppins transition transform hover:-translate-y-0.5"
   onClick={()=>navigate("/chat")}
>
  Chat
</button>
    </div>

</div>
</div>
  )
}

export default CampaignPage
