import React, { useEffect, useState } from "react";

import { formatNumber } from './utils/numbers'
import FetchApi from './utils/fetch'

import "./App.css";

export default function (){
  const [products, setProducts] = useState([])
  
  
  useEffect(() => {
    const branchNumbers = [1,2,3]
  
    const asyncDatFetch = branchNumbers.map(async (item) => await FetchApi({
      url: `/api/branch${item}.json`
    }))
  
    const allData = Promise.all(asyncDatFetch).then(individualData => {
      const combinedData = individualData.reduce((acc, {products = []}) => [...products,...acc], [])
      const unqiueData = combinedData.filter((item, index, self) => self.findIndex(t=>(t.id === item.id))===index)
      //.sort(function(a, b){return a.id - b.id})
      setProducts(combinedData)
    })
  }, [])
  
  console.info(products)
  
    return (
      <div className="product-list">
        {products.length === 0 && <h1>Loading...</h1>}
        <label>Search Products</label>
        <input type="text" />
        
        <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
        {products && products.map(item => <tr>
          <td>{item.name}</td>
          <td>{item.sold}</td>
        </tr>)}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
