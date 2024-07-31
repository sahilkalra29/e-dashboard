import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

const ProductList = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async () => {
        let result = await fetch('http://localhost:2907/products',{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) =>{
        console.warn(id)
        let result = await fetch(`http://localhost:2907/product/${id}`,{
            method: "Delete"
        });
        result = result.json()
        if(result)
        {
            getProducts();
        }
    }

    const searchHandler = async (event) => {
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:2907/search/${key}`)
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }
        else{
            getProducts();
        }
    }

    return(
        <div className="productList">
            <h3>Product List</h3>
            <input className="search_product" type="text" placeholder="Search Product" 
            onChange={searchHandler}/>
            {products.length > 0 ? (
            <>  
                <ul>
                    <li>S. No.</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Operation</li>
                </ul>
                {
                    products.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                    )
                }
            </>
            ):(
                <p>No Products Found</p>
            )}
        </div>
    )
}

export default ProductList;