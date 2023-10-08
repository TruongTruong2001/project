import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({active}) => {
  return (
    <div className="h-[120px]  mt-[70px] flex justify-center  border-green text-xl bg-white-400 items-center">
    {
       navItems && navItems.map((i,index) => (
           <div className="flex  h-[50%]  w-[12%] over- p-2   border m-2 border-color-red justify-center items-center">
               <Link to={i.url}
               className={`${active === index + 1 ?  "text-[blue] no-underline" : "black"} hover:no-underline pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
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