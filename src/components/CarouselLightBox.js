import React, { cloneElement , useState} from "react";
import { useSwipeable } from "react-swipeable";

export default function CarouselLightBox({children}) {


    const [active , setActive] = useState(0)

    const updateThubmnail = (e , newActive)=>{
        console.log(active)
        setActive(newActive)
        document.querySelectorAll('.thumbnail-active').forEach((thumbnail)=>thumbnail.classList.remove('thumbnail-active'))
        e.target.classList.add('thumbnail-active')
    }

    const updateArrows = (newActive)=>{
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
    <div className='relative lg:space-y-4 lg:w-fit '>
        <div  {...handlers} className='overflow-hidden  lg:h-96 lg:w-96 lg:rounded-lg'>
            <div onClick={()=>updateArrows(active+1)} className='flex z-10 items-center justify-center w-11 h-11 absolute bottom-[55%] -right-6 rounded-3xl bg-light-grayish-blue select-none cursor-pointer [&:hover>svg>path]:stroke-orange'><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="2.5" fill="none" fillRule="evenodd"/></svg></div>
 
            <div className='flex  h-full w-full transition-transform ' style={{transform : `translateX(-${active * 100}%)`}}>
                {React.Children.map(children , (item , index)=>{
                    return cloneElement(item)
                })}
            </div>
 
            <div onClick={()=>updateArrows(active-1)} className='flex items-center justify-center w-11 h-11 absolute bottom-[55%] -left-6 rounded-3xl bg-light-grayish-blue select-none  cursor-pointer [&:hover>svg>path]:stroke-orange' ><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="2.5" fill="none" fillRule="evenodd"/></svg></div>
        </div>

        {/* Thumbnails */}
        <div className='hidden  justify-between w-96 [&>div]:cursor-pointer lg:flex '>
            <div onClick={(e)=>updateThubmnail(e , 0)} className='thumbnail-active h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-1.jpg")] bg-cover'></div>
            <div onClick={(e)=>updateThubmnail(e,1)} className='h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-2.jpg")] bg-cover'></div>
            <div onClick={(e)=>updateThubmnail(e,2)} className='h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-3.jpg")] bg-cover'></div>
            <div onClick={(e)=>updateThubmnail(e,3)} className='h-20 w-20 rounded-lg bg-[url("../public/assets/image-product-4.jpg")] bg-cover'></div>

        </div>
    </div>
    );
}