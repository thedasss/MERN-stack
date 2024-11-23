import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecycledProducts.css'; 
import RecycleProductSidebar from "./RecycleProductSidebar";
import UpdateProductForm from "./UpdateRecycleProduct";

const RecycledProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:5000/recyclingProducts")
        .then(response => {
          setProducts(response.data.RecyclingProducts);
        })
        .catch(error => console.log(error));
    };

    getData();
  }, []);

  const handleUpdate = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/recyclingProducts/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => console.log(error));
  };

  const handleSave = (updatedProduct) => {
    axios
      .put(`http://localhost:5000/recyclingProducts/${updatedProduct._id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
        setIsEditing(false);
        setCurrentProduct(null);
      })
      .catch(error => console.log(error));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.recyclingProductName.toLowerCase().includes(searchQuery.toLowerCase()) && product.status === 'COMPLETE'
  );

  return (
    <div style={{ display: "flex" }}>
      <RecycleProductSidebar />
      <div className='component-div'>
        <div className='page-title-div'>
          <h2 className='re-page-title'>Recycled Products List</h2>
          <input
            type="text"
            placeholder="Search by Raw Material Name"
            className='search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <a href='/add-recycle-product' id='AddRecycleProductsButton-a'>
            <button id='AddRecycleProductsButton'>Add Recycle Products</button>
          </a>
        </div>
        <div id='table-div'>
          <table className='recycled-table'>
            <thead>
              <tr>
                <th>Raw Material Name</th>
                <th>Quantity</th>
                <th>Quality</th>
                <th>Date</th>
                <th>Stage</th>
                <th>Status</th>
                <th>Machine Name</th>
                <th>Machine Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id}>
                  <td>{product.recyclingProductName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.quality}</td>
                  <td>{formatDate(product.date)}</td>
                  <td>{product.stage}</td>
                  <td>{product.status}</td>
                  <td>{product.machineName}</td>
                  <td>{product.machineCondition}</td>
                  <td>
                    <button id='update-button' onClick={() => handleUpdate(product)}>Update</button>
                  </td>
                  <td>
                    <button id='delete-button' onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isEditing && currentProduct && (
            <UpdateProductForm 
              product={currentProduct} 
              onSave={handleSave} 
              onCancel={() => setIsEditing(false)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default RecycledProductsTable;
