import {useEffect } from 'react';
import Favicon from 'react-favicon';
function WrongRoute() {
  
  useEffect(() => {
    document.title = '404 PAGE NOT FOUND';
  },[]);
  return (
    <>
    <Favicon url='https://icons.getbootstrap.com/assets/icons/bug-fill.svg' />
    <div style={{color:"red"}} className='error'>
      <span> 404 PAGE NOT FOUND <br/><br/>PLEASE CHECK THE URL </span> &nbsp; <br />
      
    </div>
    </>
  );
}

export default WrongRoute;