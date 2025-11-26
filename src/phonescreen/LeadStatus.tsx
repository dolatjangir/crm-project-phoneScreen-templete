"use client";
import { IoIosArrowForward } from "react-icons/io";
import Button from "@mui/material/Button";

export default function LeadStatus() {
  const leadStatuses = [
    { name: "Interested" },
    { name: "Not Interested" },
    { name: "Fake" },
    { name: "Call Later" },
    { name: "Want Demo classes" },
    { name: "More details" },
    { name: "Will Visit" },
      { name: "Interested" },
    { name: "Not Interested" },
    { name: "Fake" },
    { name: "Call Later" },
    { name: "Want Demo classes" },
    { name: "More details" },
    { name: "Will Visit" },
  ];

  const objectcolor = [
    "#7C3AED", // purple
    "#3B82F6", // blue
    "#F97316", // orange
    "#22C55E", // green
    "#9CA3AF", // gray
    "#FB923C", // light orange
    "#8B5CF6", // purple
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 flex flex-col gap-4">
        {leadStatuses.map((status, index) => {
          // cycle color index using modulo
          const colorIndex = index % objectcolor.length;

          return (
            <Button
              key={index}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: objectcolor[colorIndex],
                minWidth: "32px",
                height: "48px",
                borderRadius: "12px",
                justifyContent: "space-between",
                paddingLeft: "16px",
                paddingRight: "16px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
              }}
              className="text-white shadow-md"
            >
              {status.name}
              <IoIosArrowForward />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
