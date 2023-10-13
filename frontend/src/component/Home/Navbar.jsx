import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({active}) => {
  return (
    <div className="h-[120px]  mt-[70px] flex justify-center text-xl bg-white-400 items-center">
    {
       navItems && navItems.map((i,index) => (
           <div className={`${active === index + 1 ?  "bg-[#008848]  text-white no-underline" : "black"} flex  h-[50%]  w-[12%]  p-2 border  rounded-lg m-2 mb-4  justify-center items-center`}>
               <Link to={i.url}
               className=" hover:no-underline  pb-[30px]  800px:pb-0 font-[500] px-6 cursor-pointer"
               > 
                     {i.title}
               </Link>
           </div>
       ))
    }
</div>
  )
}

export default Navbar