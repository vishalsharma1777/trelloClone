import {useEffect } from 'react';
import Favicon from 'react-favicon';

function ApiError({ message }) {
    useEffect(() => {
          
          document.title =message.status+' '+ message.data ;
      },[]);
  return (
    <>
      <Favicon url='https://icons.getbootstrap.com/assets/icons/bug-fill.svg' />

      <div style={{ color: 'white' }} className='error'>
        The fetching of Api Failed with the message{' '}
        <span
          style={{
            color: 'red'
          }}
        >
          {message.data}
        </span>
        <br />
        and status code{' '}
        <span
          style={{
            color: 'red'
          }}
        >
          {message.status}
        </span>
      </div>
    </>
  );
}

export default ApiError;
