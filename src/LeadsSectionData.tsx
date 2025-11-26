"use client"

import LeadsSection from "@/LeadsSection";
import { number } from "framer-motion";


export default function LeadsSectionData() {
    
  const leads = [
    {
      campaign: "Graduation",
      type: "B.COM",
      city: "jhunjhunu",
      name: "rajalakshmi",
      number:"1234567890"
    },
    {
      campaign: "Graduation",
      type: "B.COM",
      city: "jaipur",
      name: "n.amirudeen",
      number:"1234567890"
    }
  ];

const labelLeads = [
  { key: "campaign", label: "Campaign" },
  { key: "type", label: "Type" },
  { key: "city", label: "City" },
  { key: "name", label: "Name" },
  { key: "number", label: "Number" }
];

  return (
    <>
  
    <div className="  min-h-screen">
    
        <LeadsSection leads ={leads} labelLeads={labelLeads}/>
      
    </div>
    </>
  );
}
