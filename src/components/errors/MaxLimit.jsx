function MaxLimit({error}) {
    return (
        
        <>
  
        <div style={{ color: 'white' }} className='error1'>
          Can't create the new board for the reason{' '}
          <span
            style={{
              color: 'red'
            }}
          >
            {error.response.data.message}
          </span>
          <br />
          and status code{' '}
          <span
            style={{
              color: 'red'
            }}
          > {error.response.status}
          </span>
        </div>
      </>
    );
}

export default MaxLimit;