import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Order from "../OrderList/Order";
// import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import nodata from "../comonimages/noresults.svg";
import Header from "../CrmHeader/crmHeader";
const IURL = "http://Localhost:5000/order";

const fetchOrder = async () => {
  return await axios.get(IURL).then((res) => res.data);
};

function OrderDtails() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetchOrder().then((data) => setOrder(data.order));
  }, []);

   // Function to handle the deletion of an order
   const handleDelete = (id) => {
    setOrder((prevOrders) => prevOrders.filter((order) => order._id !== id));
  };

  useEffect(() => {
    fetchOrder().then((data) => setOrder(data.order));
  }, []);

  //search function
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchOrder().then((data) => {
      const filterOrder = data.order.filter((order) =>
        Object.values(order).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrder(filterOrder);
      setNoResults(filterOrder.length === 0);
    });
  };
  // Calculations
  const totalOrders = order.length;
  const ordersLessThan20 = order.filter((o) => o.quantity < 20).length;
  const totalAmount = order.reduce((acc, o) => acc + (o.orderTotal || 0), 0);

  return (
    <div>
     <Header />
      <div className="flex flex-row mt-5 mb-2 justify-between">
        <h1 className="text-center font-semibold m-1 ml-5 text-4xl text-slate-700">
          Order Details Display
        </h1>

        <div className="flex flex-row gap-3">
          <Link to="/addorder">
            <button className="h-10 mt-3 font-semibold bg-green-700 mr-28 rounded-lg w-44">
              Place New Order
            </button>
          </Link>
          <form className="   rounded-lg flex items-center h-12 mr-1  mt-2">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search..."
              //Responsivness od the components
              //w-24 --> make the size according to the mobile
              //sm:w-64 --> above the size of the mobile
              className="bg-green-100  w-44 sm:w-64 border-none h-10 "
            />
            
          </form>
          <button
            className="h-10 font-bold bg-green-500 px-5 rounded-lg w-32 mt-3"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <hr className="border-2" />
      <div className="mt-2 text-center  p-3">
        <h1 className="text-3xl font-bold mr-2">Order Summary</h1>
        <div className="flex flex-row gap-10 mx-auto items-center w-3/5 mt-5">
          <h4 className="font-semibold text-2xl ml-14 border-2 p-1 rounded-lg border-dashed border-slate-900">
            Total Orders: {totalOrders}
          </h4>
          <h4 className="font-semibold text-2xl border-2 rounded-lg p-1 border-dashed border-slate-900">
            Quantity Less Than 20: {ordersLessThan20}
          </h4>
          <h4 className="font-semibold text-2xl border-2 rounded-lg p-1 border-dashed border-slate-900">
            Total Amount : ${totalAmount.toFixed(2)}
          </h4>
        </div>
      </div>
      <div className="mt-10">
        <table className=" mx-auto">
          <tr className="bg-green-300 ">
            <td className=" p-2 border-hidden font-bold text-center w-48 border-green-500">
              Product Name
            </td>
            <td className=" p-2 border-hidden font-bold text-center w-48  border-green-500">
              Category
            </td>
            <td className="p-2 border-hidden font-bold text-center w-48 border-green-500">
              Location
            </td>
            <td className=" border-hidden font-bold text-center p-2 w-48 border-green-500">
              Delivery Type
            </td>

            <td className=" border-hidden font-bold text-center p-2 w-48 border-green-500">
              Recipt No
            </td>
            <td className="  border-hidden font-bold text-center p-2 w-48 border-green-500 text-nowrap">
              Description
            </td>

            <td className="border-hidden font-bold text-center p-2 w-48 border-green-500">
              Unit Price
            </td>
            <td className="border-hidden font-bold text-center w-32 border-green-500">
              Quantity
            </td>
            <td className="border-hidden font-bold text-center p-2 w-48 border-green-500">
              Order Total
            </td>
            <td className="border-hidden font-bold text-center p-2 w-48 border-green-500">
              Payment Type
            </td>
            <td className="border-hidden font-bold text-center p-2 w-56 border-green-500">
              Actions
            </td>
          </tr>
        </table>
      </div>
      {/* Search bar results display */}
      {noResults ? (
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-slate-600 text-center mt-16">
            There are no matching results!......
            <img
              src={nodata}
              alt="No Data"
              className="mx-auto mt-20 w-96 h-96"
            />
          </h1>
        </div>
      ) : (
         <div className="mb-52">
      {/* Map through the order array and pass the handleDelete function */}
      {order &&
        order.map((order, i) => (
          <div key={i}>
            <Order order={order} onDelete={handleDelete} />
          </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default OrderDtails;
