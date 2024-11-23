import React from "react";
import { Link } from "react-router-dom";


function crmHeader() {
  return (
    <div className=" flex flex-col">
      <header>
        <div className="flex  p-2 bg-slate-300">
          <div className="mx-auto ml-5 mt-1">
            <ul className="flex gap-8 font-bold ">
              <Link to="/crmHome">
                <li className="hover:underline text-2xl gap-6">Home</li>
              </Link>
              <Link to="/orderDetails">
                <li className="hover:underline text-2xl">Order</li>
              </Link>
              <Link to="/crmReport">
                <li className="hover:underline text-2xl">Report</li>
              </Link>
              <Link to="/inventoryReport">
                <li className="hover:underline text-2xl">Support Desk</li>
              </Link>
            </ul>
          </div>
          <div className="flex p-1 mr-5">
            <ul className="flex gap-5 font-bold pr-2 pt-1">
              <Link to="./sign-in">
                <li className="hover:underline text-2xl"></li>
              </Link>
              <Link to="/CRMLogin">
                <li className="hover:underline text-2xl">Log Out</li>
              </Link>
            </ul>

            {/*<form className="bg-slate-100 p-2 rounded-lg flex items-center ">
            <input
              type="text"
              placeholder="Search..."
              //Responsivness od the components
              //w-24 --> make the size according to the mobile
              //sm:w-64 --> above the size of the mobile
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>*/}
          </div>
        </div>
      </header>
    </div>
  );
}
export default crmHeader;
