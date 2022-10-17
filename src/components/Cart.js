import { stringify } from "postcss";
import React from "react"

export default function Cart({cart , onDelete}){
  
    return (
        <div id="cart" className='hidden absolute bg-white top-20 z-20 right-0 w-full  h-fit min-h-[13rem] rounded-xl shadow md:w-72 '>
            <h2 className='border-b-2 py-4 px-6 mb-4'>Cart</h2>
            {/* Inner cart Items */}
            
            { cart.length > 0 && 

                
                <div className='flex flex-col  gap-2 w-[90%] mx-auto'>
                    {cart.map((cartItem , index)=>{
                        
                        return (    
                        <div key={index} data-id={String(index)} className='flex gap-2 mb-4'>
                            <img className='w-12 h-full rounded' src='./assets/image-product-1.jpg'></img>
                            <div className='w-5/6'>
                                <p>{cartItem.product}</p>
                                <p>{cartItem.price} x {cartItem.items} <span className='font-[700]'>${cartItem.price*cartItem.items}</span></p>
                            </div>
                            <img onClick={(e)=>onDelete(e)} className="h-4 w-4 cursor-pointer" src="./assets/icon-delete.svg"></img>
                        </div>
                        )    
                    })}
                    <button className='bg-orange min-h-[40px] text-white rounded-lg mb-4'>Check out</button>
                </div>
                
            }
            
            {
                cart.length == 0 && 
                    <div className='flex flex-col justify-center h-20 gap-2 w-[90%] mx-auto'>
                        <p className="text-center h-fit">
                            Your cart is empty
                        </p>
                    </div>                
                
            }
            {/* ---------------------- */}
            
        </div>
      
    );
}