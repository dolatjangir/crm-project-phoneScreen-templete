"use client";

import { useEffect, useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { GrFormNext , GrFormPrevious } from "react-icons/gr";

import { AiOutlineBackward,AiOutlineForward } from "react-icons/ai"
export interface LabelConfig {
  key: string;
  label: string;
}

interface LeadsSectionProps<T extends Record<string, any>> {
  leads: T[];
  labelLeads: LabelConfig[];
}

export default function LeadsSection<T extends Record<string, any>>({
  leads,
  labelLeads,
}: LeadsSectionProps<T>) {
  const [toggleSearchDropdown, setToggleSearchDropdown] = useState(false);
  const[currentPage, setCurrentPage] = useState(1);
  const itemsperpage = 5;

  const totalPages = Math.ceil(leads.length/itemsperpage);
  const startIndex = (currentPage - 1) * itemsperpage;
  const paginatedLeads =  leads.slice(startIndex,startIndex + itemsperpage);


  const nextPage =()=>{
    if(currentPage < totalPages) setCurrentPage(currentPage + 1);
  
  };

  const prevPage = () =>{
    if(currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const getDisplayedPages = () => {
  if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (currentPage === 1) return [1, 2, 3];
  if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];

  return [currentPage - 1, currentPage, currentPage + 1];
};
const pages = getDisplayedPages();
  return (
    <>
      {/* LEAD CARDS */}
      <div className="px-4 pb-4">
        {paginatedLeads.map((lead, index) => (
          <div key={index} className="w-full  bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 mb-5">
            <div className="bg-table h-2"></div>

            <div className="flex justify-between items-start p-4">
              <div>
                {labelLeads.map((item, j) => (
                  <div key={j} className="mb-2 flex items-center">
                    <span className="font-semibold text-black text-lg">{item.label}</span>
                    <span className="mx-2">-</span>
                    <span className="text-gray-700 text-lg">
                      {String(lead[item.key])}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-gray-100 rounded-full shadow">
                <AiOutlineHeart size={20} className="text-indigo-500" />
              </div>
            </div>

            <div className="bg-table p-3 flex justify-between">
              <button className="text-white border border-white px-3 text-sm py-1 rounded-full">
                FOLLOW UP
              </button>

              <div className="flex items-center gap-5">
                <a href={`tel:${lead["number"] ?? ""}`}>
                  <MdPhone size={20} className="text-white" />
                </a>
                <MdEmail size={20} className="text-white" />
                <a href={`https://wa.me/${lead["number"] ?? ""}`} target="_blank">
                  <FaWhatsapp size={20} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* animated button */}
        {paginatedLeads.length > 0 && (
      <div  className="flex items-center justify-center w-full">
          <div className="flex items-center space-x-2 p-2  rounded-lg">
             <button onClick={()=>setCurrentPage(1)}  className=" h-[30px] w-[30px] bg-neutral-200 rounded-full text-sm grid place-items-center"><AiOutlineBackward/> </button>
            <button onClick={prevPage} 
        disabled = {currentPage === 1}
         className= {`h-[30px] w-[30px] bg-neutral-200 rounded-full text-sm grid place-items-center ${currentPage === 1 ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-neutral-200 "}`}><GrFormPrevious/></button>
    <AnimatePresence mode="popLayout">
    {pages.map((num,i)=>( 
      <motion.button
      key={i}
       onClick={()=>setCurrentPage(num)}
        className={`h-[30px] w-[30px] bg-neutral-200 rounded-full text-sm grid place-items-center  ${num === currentPage? "bg-table text-white w-[35px] h-[35px]": "bg-neutral-200 text-black w-[30px] h-[30px]" 
    }`}>
          {num}
          </motion.button>
        ))}
        </AnimatePresence>
     
      <button 
      onClick={nextPage} 
        disabled = {currentPage === totalPages}
      className={`h-[30px] w-[30px] bg-neutral-200 rounded-full text-sm grid place-items-center ${currentPage === totalPages ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-neutral-200 "}`}><GrFormNext/> </button>
            <button onClick={()=>setCurrentPage(totalPages)} className=" h-[30px] w-[30px] bg-neutral-200 rounded-full text-sm grid place-items-center"><AiOutlineForward/> </button>
    </div>
      </div>)}
      </div>
      {/* <div>
        <button onClick={prevPage} 
        disabled = {currentPage === 1}
          className={`px-2 py-2 rounded-full border
      ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-table text-white"}
    `}>prev</button>
     <button onClick={nextPage} 
        disabled = {currentPage === totalPages}
          className={`px-4 py-2 rounded-xl border
      ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-table text-white"}
    `}>next</button>
      </div> */}
      
    </>
  );
}
