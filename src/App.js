import React, { useEffect, useState } from 'react'
import Carousel from './components/Carousel'
import CarouselLightBox from './components/CarouselLightBox'
import { useSwipeable } from "react-swipeable";
import Cart from './components/Cart';

function App() {
    const [cart , setCart] = useState([])
    const [numOfItems , setNumOfItems] = useState(0)

    useEffect(()=>{
        document.querySelector('main').addEventListener('click' , ()=>{
            document.getElementById('cart').style.display = 'none'
        })
    
    } ,[])
    
    const handleNumOfItems = (newNum)=>{
        if (newNum < 0) newNum = 0
        else if (numOfItems > 10) newNum = newNum - 1

        setNumOfItems(newNum)
    }

    const handleCartAdd = ()=>{
        const price = document.getElementById('price').textContent.replace('$' , '')
        const items = numOfItems
        const product = document.getElementById('product').textContent
        if (items == 0){
            setNumOfItems(0)
            return
        } 
        
       const result = []
        cart.forEach((cartItem , index)=>{
            if (cartItem.product  == product) {
                result.push(true)
                setCart((prevCart)=>{
                    prevCart[index].items +=  items
                    return prevCart 
                }) 
            }
        })

        if (!result.includes(true)) {
            setCart((prevCart)=>{
                return prevCart.concat({product : product , price :parseInt(price) ,items:parseInt(items)})
            })
        }

        setNumOfItems(0)
    }

    const hideCart = ()=>{
        const cartElement = document.getElementById('cart')
        if (cartElement.style.display == 'block') cartElement.style.display = 'none';
        else cartElement.style.display = 'block'

    }

    const hideLightBox = ()=>{
        const box = document.getElementById('light-box');
        if (window.innerWidth < 1024) {
            box.style.display = 'none'
        }
        else{
            if(box.style.display == 'flex') box.style.display = 'none'
            else box.style.display = 'flex'
    
        }
    }

    const slideBar = ()=>{
        const nav= document.querySelector('nav')
        if (nav.style.display == 'block') {
            nav.style.display = 'none'
        }
        else{
            nav.style.display = 'block'
        }
    }

    const handleDelete = (e)=>{
        const id = e.target.parentNode.getAttribute('data-id')
        const newCart = cart.splice(parseInt(id)+1)
        setCart(newCart)
    }



    return(
        <div className='container mx-auto pb-2 lg:w-4/5' > 

            <header className='relative flex items-center justify-between gap-12  h-20 px-4 md:px-0 lg:border-b '>

                {/* Logo and Menu icon */}
                <div className='flex items-center gap-4'>
                    <img onClick={()=>slideBar()} src='./assets/icon-menu.svg' className='block w-4 cursor-pointer md:hidden'></img>
                    <img className='md:w-40' src='./assets/logo.svg'></img>
                </div>
                {/* END Logo and Menu icon*/}

                <nav className='animate-slideIn hidden absolute left-0 top-0 bg-white z-30 h-[100vh] w-1/2 md:block md:static md:h-full'>
                   <div onClick={()=>slideBar()} className='w-1/2 mx-auto  mt-4 cursor-pointer md:hidden'><img src='./assets/icon-close.svg'></img></div>
                   <ul className='flex flex-col w-1/2 h-full items-start mx-auto mt-9  gap-4   [&>a]:cursor-pointer md:flex-row md:m-0 md:gap-10  '>
                        <li className='font-[700] sm:hover:text-orange md:font-[400] md:text-dark-grayish-blue md:h-full md:flex md:items-center md:border-b-2 md:border-transparent md:hover:border-orange '><a href='#'>Collections</a></li>
                        <li className='font-[700] sm:hover:text-orange md:font-[400] md:text-dark-grayish-blue md:h-full md:flex md:items-center md:border-b-2 md:border-transparent md:hover:border-orange'><a href='#'>Men</a></li>
                        <li className='font-[700] sm:hover:text-orange md:font-[400] md:text-dark-grayish-blue md:h-full md:flex md:items-center md:border-b-2 md:border-transparent md:hover:border-orange'><a href='#'>Women</a></li>
                        <li className='font-[700] sm:hover:text-orange md:font-[400] md:text-dark-grayish-blue md:h-full md:flex md:items-center md:border-b-2 md:border-transparent md:hover:border-orange'><a href='#'>About</a></li>
                        <li className='font-[700] sm:hover:text-orange md:font-[400] md:text-dark-grayish-blue md:h-full md:flex md:items-center md:border-b-2 md:border-transparent md:hover:border-orange'><a href='#'>Contact</a></li>
                    </ul> 
                </nav>

                {/* Cart and Avatar */}
                <div className='flex items-center justify-end gap-4 md:gap-6'>
                    {/* cart */}
                    <div onClick={()=>{hideCart()}} className='relative flex justify-end w-10 cursor-pointer md:w-14'>
                        <img className='hover:contrast-200' src='./assets/icon-cart.svg'></img>
                        { cart.length > 0 &&<div className='absolute flex justify-center items-center rounded-md top-0 right-0 w-3 h-3 text-[8px] text-white bg-orange'>{cart.length}</div>}  
                    </div>
                    
                    <Cart cart={cart} onDelete={handleDelete}></Cart>

                    {/* avatar */}
                    <img src='./assets/image-avatar.png' className='w-10 box-content rounded-3xl p-[2px] border border-transparent hover:border-orange cursor-pointer'></img>
                </div>
                {/* END Cart and Avatar*/}
            </header> 

            <main className='grid gap-4 lg:grid-cols-[400px_400px] lg:justify-evenly lg:mt-14 lg:items-center'>
                {/* Carousel */}
                <Carousel>
                        <img onClick={()=>hideLightBox()} src='./assets/image-product-1.jpg'></img>
                        <img onClick={()=>hideLightBox()} src='./assets/image-product-2.jpg'></img>
                        <img onClick={()=>hideLightBox()} src='./assets/image-product-3.jpg'></img>
                        <img onClick={()=>hideLightBox()} src='./assets/image-product-4.jpg'></img>
                </Carousel>                

                    {/* LightBox carousel */}
                <div id='light-box' className='hidden fixed z-40 left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-black/75'>
                    <div onClick={()=>{hideLightBox()}} className='w-96 py-2 flex justify-end'><img src='./assets/icon-close.svg'></img></div>
                    <CarouselLightBox>
                            <img src='./assets/image-product-1.jpg'></img>
                            <img src='./assets/image-product-2.jpg'></img>
                            <img src='./assets/image-product-3.jpg'></img>
                            <img src='./assets/image-product-4.jpg'></img>
                    </CarouselLightBox>                                    
                </div>
                {/*End Carousel */}

                <section className='px-4'>
                    {/* Title and Descriptin  */}
                    <p className='font-[700] text-xs text-orange '>SNEAKER COMPANY</p>
                    <h1 id='product' className='font-[700] leading-[3rem] text-[2.5rem] text-very-dark-blue'>Fall Limited Edition Sneakers</h1>
                    <p className='text-sm text-dark-grayish-blue my-6'>
                        These low-profile sneakers are your perfect casual wear companion. Featuring a 
                        durable rubber outer sole, they’ll withstand everything the weather can offer.
                    </p>
                    {/* END Title and desription*/}

                    {/* Prices */}
                    <div className='flex justify-between items-center lg:flex-col lg:items-start'>
                        <div className='flex items-center gap-2 '>
                            <span id='price' className='font-[700] text-2xl '>$125.00</span>
                            <span className='bg-pale-orange text-xs font-[700] text-orange  px-2 py-1 rounded'>50%</span>
                        </div>

                        <p className='text-sm text-grayish-blue line-through'>$250.00</p>
                    </div>
                    {/* END Prices*/}

                    {/* Buttons  */}
                    <div className='grid gap-2 [&>*]:px-2 [&>*]:rounded [&>*]:h-10  mt-4  lg:grid-cols-[1fr,2fr]'>
                        <div className='flex justify-between items-center bg-light-grayish-blue' >
                            <img className='cursor-pointer select-none hover:opacity-70' onClick={()=>handleNumOfItems(numOfItems-1)} src='./assets/icon-minus.svg'></img>
                            <span id='items-number'>{numOfItems}</span>
                            <img className='cursor-pointer select-none hover:opacity-70' onClick={()=>handleNumOfItems(numOfItems+1)} src='./assets/icon-plus.svg'></img>
                        </div>

                        <button onClick={()=>handleCartAdd()} className='relative bg-orange text-white text-sm font-[700] w-full hover:opacity-70
                        after:w-5 after:h-5 after:absolute  after:bg-[url("../public/assets/icon-cart-white.svg")] after:bg-center after:left-[25%]  md:after:left-[40%] lg:after:left-[20%]'>Add to cart</button>
                    </div>
                    {/* END Buttons */}
                </section>
            </main>
        </div>
    )
}

export default App