import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';


const PasswordInput = ({value,onChange,placeholder}) => {
  const [isShowPassword,setIsShowPassword] = useState(false);

 const toggleShowPassword=()=>{
    setIsShowPassword(!isShowPassword);
 }
    return (
    <div className='flex items-center bg-transparent border-[1.5px] rounded mb-4' >
      <input 
      value={value} 
      placeholder={placeholder || 'Password'}
      onChange={onChange}
      type={isShowPassword ? 'text' : 'password'}
      className='w-full text-sm bg-transparent rounded outline-none py-3 ml-3'
      ></input>
      {isShowPassword ?  <FaRegEye
      size={22}
      className='text-primary cursor-pointer mr-1'
      onClick={()=> toggleShowPassword()}
      />
    : <FaRegEyeSlash
      size={22}
      className='text-slate-600 cursor-pointer mr-1'
      onClick={()=> toggleShowPassword()}
    ></FaRegEyeSlash>}

     
    </div>
  )
}

export default PasswordInput
