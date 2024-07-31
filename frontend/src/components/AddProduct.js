import React from "react";


const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');

    const addProduct = async () => {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        console.warn(userId)
        let result = await fetch("http://localhost:2907/add-product",{
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: { 
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })

        result = await result.json()
        console.warn(result)
    }

    return(
        <div className="addProduct">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter product name" className="inputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}}/>
            
            <input type="text" placeholder="Enter product price" className="inputBox"
            value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

            <input type="text" placeholder="Enter product category" className="inputBox"
            value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            
            <input type="text" placeholder="Enter product company" className="inputBox"
            value={company} onChange={(e)=>{setCompany(e.target.value)}}/>

            <button onClick={addProduct} className="appButton">Add Product</button>
        </div>
    )
}

export default AddProduct;