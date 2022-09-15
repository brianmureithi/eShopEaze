import React from 'react'


function Modal({visible, onClose, onConfirm,productName}) {

    const handleOnClose = (e)=>{
        if(e.target.id ==='container') onClose();
    
    };
    const handleDelete = (e)=>{
        onConfirm();
    }
    if(!visible){
        return null;
    }
  return (
    <div id='container' onClick = {handleOnClose} className='fixed inset-0 bg-gray-700 bg-opacity-20 backdrop-blur-sm flex justify-center items-center '>

        <div className='w-[30rem] bg-slate-100'>
         <p> Confirm deleting product product?{productName}</p> 
         <div>
            
            <button onClick={handleDelete}>Delete</button>
         </div>
        </div>
    </div>
  )
}

export default Modal