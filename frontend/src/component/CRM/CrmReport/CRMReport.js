import React from "react";
import Header from "../CrmHeader/crmHeader";
import PrintableOrder from "../OrderReport/PrintableOrder";
import ReportButton from "../OrderReport/ReportButton";
import { useRef } from "react";
import { Link } from "react-router-dom";

// Import the new component

function CRMReport() {
  const componentsRef = useRef(); // Shared ref for the content to print
  return (
    <div>
      <Header />

      <div className="flex flex-col m-5">
        <h1 className="text-center font-bold text-6xl text-slate-700">
          Report Section
        </h1>
        <hr className="border-4 mt-3 mb-2" />
      </div>
      <div className=" flex flex-col gap-5">
        <div className="flex flex-row gap-20 mx-auto w-3/3 mt-5 mr-10 ml-10 ">
          <div className="relative w-1/3 h-52 bg-sky-300 rounded-lg m-3 shadow-2xl">
            <div className=" w-auto h-12 bg-lime-500 rounded-lg  ">
              <div className="text-center font-medium text-2xl text-slate-900 p-1">
                 Report
              </div>
            </div>
            
          </div>
          <div className="relative w-1/3 h-52 bg-sky-300 rounded-lg m-3 shadow-2xl">
            <div className=" w-auto h-12 bg-lime-500 rounded-lg  ">
              <div className="text-center font-medium text-2xl text-slate-900 p-1">
                Generate Order Report
              </div>
            </div>
            {/* Print button is outside the ref scope, which is fine */}
            <div className="absolute bottom-3 right-3">
              <ReportButton contentRef={componentsRef} />
            </div> 
          </div>
          <div className="relative w-1/3 h-52 bg-sky-300 rounded-lg m-3 shadow-2xl">
            <div className=" w-auto h-12 bg-lime-500 rounded-lg ">
              <div className="text-center font-medium text-2xl text-slate-900 p-1">
                Upload Report
              </div>
            </div>
            <Link to="/sendReport">
              <button className="bg-lime-500 w-48 rounded-lg text-center absolute bottom-3 right-3">
                Upload Report
              </button>
            </Link>
          </div>
        </div>
        {/* Hidden Printable Order */}
        <div style={{ display: "none" }}>
          <PrintableOrder ref={componentsRef} />
        </div>
        <div className="flex flex-row gap-20 mx-auto w-3/3 mt-5 mr-10 ml-10 ">
          <div className="relative w-1/3 h-52 bg-slate-100 rounded-lg m-3 shadow-2xl">
            <div className=" w-auto h-12 bg-green-200 rounded-lg  ">
              <div className="text-center font-medium text-2xl text-slate-900 p-1">
                Generate Order Report
              </div>
            </div>
            <button className="bg-lime-500 w-48 rounded-lg text-center absolute bottom-3 right-3">
              Generate Report
            </button>
          </div>
          <div className="relative w-1/3 h-52 bg-slate-100 rounded-lg m-3 shadow-2xl">
            <div className=" w-auto h-12 bg-green-200 rounded-lg  ">
              <div className="text-center font-medium text-2xl text-slate-900 p-1">
                Generate Order Report
              </div>
            </div>
            <button className="bg-lime-500 w-48 rounded-lg text-center absolute bottom-3 right-3">
              Generate Report
            </button>
          </div>
          <div className="relative w-1/3 h-52 bg-slate-100 rounded-lg m-3 shadow-2xl">
            <div className=" w-auto h-12 bg-green-200 rounded-lg  ">
              <div className="text-center font-medium text-2xl text-slate-900 p-1">
                Generate Order Report
              </div>
            </div>
            <button className="bg-lime-500 w-48 rounded-lg text-center absolute bottom-3 right-3">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default CRMReport;
