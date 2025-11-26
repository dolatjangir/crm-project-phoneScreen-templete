"use client";
import { useState } from "react";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineMenu } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

interface LeadItem {
  campaign: string;
  type: string;
  city: string;
  name: string;
  number: string;
}
interface labelLeadItem {
   key:string;
   label:string
}    

interface leadsInterface{
  leads:LeadItem[]
  labelLeads:labelLeadItem[]
}


export default function LeadsSection({leads,labelLeads}:leadsInterface) {
   const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  return (
    <>
       <header className="bg-table text-white text-shadow-2xs p-4 flex flex-row items-center justify-start">
      <span className="text-xl"><MdOutlineMenu/></span>
       <span className="ml-4 font-semibold text-xl">Make My Leads</span>
    </header>
    <div onClick={()=>setToggleSearchDropdown(!toggleSearchDropdown)} className="bg-table px-3 py-1.5 w-fit rounded-2xl my-4 ml-5 flex items-center">
        <button className="text-white text-xs font-semibold">ADVANCED SEARCH</button> 
     <button
                  type="button"

                  className="p-2 hover:bg-gray-200 rounded-md cursor-pointer text-white"
                >
                  {toggleSearchDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                
                </div>
                 <div className={`overflow-hidden ${toggleSearchDropdown ? "max-h-[2000px]" : "max-h-0"} transition-all duration-500 ease-in-out px-5`}>
    <div className="flex flex-row gap-2 mb-2 w-full">
        <label className="py-2 px-3 w-1/2 rounded-3xl border">Campaign</label> 
        <label className="py-2 px-3 w-1/2 rounded-3xl border">City</label>
    </div>
                 </div>
   {/* body */}
    
   <div className="px-4 pb-4">
    {leads.map((lead, index)=>(
    <div key={index} 
    className="w-full  bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 mb-5">
     <div className="bg-table h-2"></div>
     <div className="flex justify-between items-start p-4">
      {/* Top Section */}
      <div className="">
        {labelLeads.map((item,j)=>(
        <div key={j} className="">
          <div>
            {/* Campaign */}
            <div  className="flex items-center mb-2">
              <span className="font-semibold text-black text-lg">{item.label}</span>
              <span className="mx-2">-</span>
              <span className="text-gray-700 text-lg">{lead[item.key as keyof LeadItem]}</span>
            </div>

       
         
          </div>
         

        
        </div>))}
      </div>
        {/* Heart Icon */}
          <div className="p-2 bg-gray-100 rounded-full shadow">
            <AiOutlineHeart size={20} className="text-indigo-500" />
          </div>
          </div>

      {/* Bottom Actions */}
      <div className="w-full bg-table p-3 flex items-center justify-between rounded-b-xl">

        <button className="text-white border border-white px-3 text-sm py-1 rounded-full font-semibold">
          FOLLOW UP
        </button>

        <div className="flex items-center gap-5">
          {/* Call */}
          <a href={`tel:${lead.number}`}>
          <MdPhone size={20} className="text-white" />
          </a>
          {/* Message Icon */}
          {/* <a href={`mailto:${lead.email}`}> </a> */}
          <MdEmail size={20} className="text-white" />
         
          {/* WhatsApp */}
          <a href={`https://wa.me/${lead.number}`} target="_blank">
          <FaWhatsapp size={20} className="text-white" />
          </a>
          {/* Add */}
          {/* <IoIosAddCircle size={30} className="text-white" /> */}
        </div>
      </div>
    </div>
    ))}
    </div>
    </>
  );
}
