import React from "react";
import Image from "next/image";

import threeLines from "../asserts/threeLines.png";
const Navbar = () => {
  return (
    <div className='bg-[#DABCCE] h-[65px] flex justify-between px-6'>
      <div className='h-6 left'>
        <Image src={threeLines}  alt='three lines' />
      </div>
      <div className='flex items-center right'>
        <div className='bar bg-[#AD1A72] w-[2px] h-[33px]'></div>
        <div className='w-6 h-6 ml-4 bg-white rounded-full circle '></div>
        <p className='ml-2 text-[#AD1A72]'>James Smith</p>
      </div>
    </div>
  );
};

export default Navbar;
