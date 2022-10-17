import React, { cloneElement , useState} from "react";
import { useSwipeable } from "react-swipeable";

export default function Carousel({children}) {


    const [active , setActive] = useState(0)

    const updateByThubmnail = (e , newActive)=>{
        console.log(active)
        setActive(newActive)
        document.getElementsByClassName

        document.querySelectorAll('.thumbnail-active').forEach((thumbnail)=>thumbnail.classList.remove('thumbnail-active'))
        e.target.classList.add('thumbnail-active')
    }

    const updateByArrows = (newActive)=>{
        if(newActive < 0){
            newActive = 0
        }
        else if(newActive >= React.Children.count(children)){
            newActive = React.Children.count(children)-1
        }

        setActive(newActive)
    }

    const handlers = useSwipeable({
        onSwipedLeft : ()=>updateArrows(active+1),
        onSwipedRight : ()=>updateArrows(active-1)
    })

    return(
    <div className='lg:space-y-4 lg:w-fit '>
        <div  {...handlers} className='relative overflow-hidden  lg:h-96 lg:w-96 lg:rounded-lg'>
            <div onClick={()=>updateByArrows(active+1)} className='flex z-10 items-center justify-center w-8 h-8 absolute bottom-1/2 right-2 rounded-2xl bg-light-grayish-blue select-none [&>img]:w-2 cursor-pointer lg:hidden'><img  src='./assets/icon-next.svg'></img></div>
 
            <div className='flex  h-full w-full transition-transform ' style={{transform : `translateX(-${active * 100}%)`}}>
                {React.Children.map(children , (item , index)=>{
                    return cloneElement(item)
                })}
            </div>
 
            <div onClick={()=>updateByArrows(active-1)} className='flex items-center justify-center w-8 h-8 absolute bottom-1/2 left-2 rounded-2xl bg-light-grayish-blue select-none [&>img]:w-2 cursor-pointer lg:hidden'><img src='./assets/icon-previous.svg'></img></div>
        </div>

        {/* Thumbnails */}
        <div className='hidden  justify-between w-96 [&>div]:cursor-pointer lg:flex '>
            <div onClick={(e)=>updateByThubmnail(e , 0)} className='thumbnail-active h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-1.jpg")] bg-cover'></div>
            <div onClick={(e)=>updateByThubmnail(e,1)} className='h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-2.jpg")] bg-cover'></div>
            <div onClick={(e)=>updateByThubmnail(e,2)} className='h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-3.jpg")] bg-cover'></div>
            <div onClick={(e)=>updateByThubmnail(e,3)} className='h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-4.jpg")] bg-cover'></div>

        </div>
    </div>
    );
}