import React from 'react';
import "./AddPay.css";
const AddPay = () => {
    var Productbuy=JSON.parse(localStorage.getItem("buypro"));
    console.log(Productbuy);
    return (
        <div className='cardpay'>
            <table border="1px" width="100%">
                <tr>
                    <td colSpan="2">Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                </tr>
                {Productbuy != null?(
                    Object.keys(Productbuy).map((id, index)=>{
                        console.log(Productbuy[id].name);
                        return(
                            <tr>
                                <td width="25.2px"><img src={Productbuy[id].url} height="25.2px"></img></td>
                                <td>{Productbuy[id].name}</td>
                                <td>{Productbuy[id].price}</td>
                                <td>{Productbuy[id].quantity}</td>
                            </tr>
                        )
                    })
                ):(
                    ""
                )}
                
            </table>
        {/* <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center",}}>
            <label htmlFor='category'>Category</label>
            <select name="category" id="category" onChange={handleInputChange}>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
              <option value="Cloth">Cloth</option>
              <option value="Car">Car</option>
              <option value="Phone">Phone</option>
            </select>

            <label htmlFor='name'>Name</label>
            <input 
                type="text"
                id="name"
                name="name"
                placeHolder="Your Name..."
                value={name || ""}
                onChange={handleInputChange}
             />

             <label htmlFor='price'>Price</label>
            <input 
                type="number"
                id="price"
                name="price"
                placeHolder="Your Price..."
                value={price || ""}
                onChange={handleInputChange}
             />

             <label htmlFor='quantity'>Quantity</label>
            <input 
                type="number"
                id="quantity"
                name="quantity"
                placeHolder="Your Quantity..."
                value={quantity || ""}
                onChange={handleInputChange}
             />

              <label htmlFor='img'>Image</label>
            <div className='imgup'>
              <input 
                  type="file"
                  id="img"
                  className='imgs'
                  name="img"
                  placeHolder="Your Image..."
                  value={img || ""}
                  onChange={handleImageChange}
              /><div className='imgss' onClick={uploadImage} >click</div>

            </div>
            <div className='show_img'>
              <img alt="Wait your img before click add product" src={url} width="100%"/>
            </div>
            {url?(
              <button onClick={handleSubmit} className="btn_submit">Add Product</button>
            ):("")}
             
        </form> */}

    </div>
  )
}

export default AddPay