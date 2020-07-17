import React, { useEffect, useState } from "react";

import { formatNumber, revenueCalculator } from './utils/numbers'
import { orderProducts } from './utils/string'
import FetchApi from './utils/fetch'

import "./App.css";

export default function (){
  const [products, setProducts] = useState([])
  const [filteredProducts, filterProducts] = useState([])
  
  useEffect(() => {
    const branchNumbers = [1,2,3]
  
    const asyncDatFetch = branchNumbers.map(async (item) => await FetchApi({
      url: `/api/branch${item}.json`
    }))
  
    Promise.all(asyncDatFetch).then(individualData => {
      const combinedData = individualData.reduce((acc, {products = []}) => [...products,...acc], [])
      const uniqueData = combinedData.reduce((acc, cur) => {
        const matchingIdIndex = acc.findIndex(t=>(t.id === cur.id))
        const currentRevenue = revenueCalculator(cur.unitPrice, cur.sold)
        if(matchingIdIndex !== -1) {
          acc[matchingIdIndex].revenue += currentRevenue
          return acc
        }
        acc.push({...cur, revenue: currentRevenue})
        return acc
      }, [])
      const orderedProducts = orderProducts(uniqueData)
      setProducts(orderedProducts)
      filterProducts(orderedProducts)
    })
  }, [])
  
  const doSearch = (text) => {
    const filteredProducts = products.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
    filterProducts(filteredProducts)
  }
  
  const currentTotalRevenue = filteredProducts.reduce((acc, {revenue = 0}) => acc + revenue, 0)
  
    return (
      <div className="product-list">
        {products.length === 0 && <h1>Loading...</h1>}
        <label htmlFor="search">Search Products</label>
        <input type="text" id="search" onChange={el => {
          doSearch(el.currentTarget.value)
        }} />
        
        <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
        {filteredProducts && filteredProducts.map(item => {
          return <tr key={item.name}>
            <td>{item.name}</td>
            <td>£{formatNumber(item.revenue)}</td>
          </tr>
        }
        )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>£{formatNumber(currentTotalRevenue)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
