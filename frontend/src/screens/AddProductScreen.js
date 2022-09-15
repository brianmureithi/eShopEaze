import React, { useState, useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts, saveProduct } from "../actions/productActions";
import Modal from "../components/Modal";

export default function AddProductScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState('');
    const [imagery, setImagery] = useState({});
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;
    const productSave = useSelector((state) => state.productSave);
    
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {};
    }, [successSave,successDelete]);
    const submitHandler = (e) => {

        e.preventDefault();
        
      
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image :imagery,
                category,
                description,
                brand,
                countInStock,
            })
        );
    };

    /* Close delete Modal */
    const handleOnclose = ()=>{
        setModalVisible(false);
    }
        const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };
    const openModal = (product) => {
       
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImagery(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
    };

    let resetModal = (e) =>{
        e.preventDefault();
        
        setId('');
        setName('');
        setPrice('');
        setImagery('');
        setBrand('');
        setCountInStock('');
        setCategory('');
        setDescription('');
        
    }

    return ( 
       
        <div className = " w-full md:relative flex  flex-col md:flex-row-reverse md:py-4 md:px-4">
           {/*  <div className="">
<div className = "">
    <h3>Products</h3>
    <button className="primary btn-create" onClick={()=> openModal({})}>Create Product</button>

</div>
</div> */}
  <button className="md:absolute top-2 m-4 right-16 inline-block primary btn-create" onClick={resetModal}>Create Product</button>

<form onSubmit={submitHandler} className=' w-full md:w-1/4 border md:px-6 py-2 md:mt-24 bg-slate-100 rounded-md'>
    <div className="text-center my-3">
        <h2 className="text-2xl font-bold">{ id ?  "Edit Product" : "Create new Product" }</h2>
    </div>
    <div className="flex flex-col mb-4">
        <label className="mb-4 text-2xl font-medium" htmlFor = "name">Name</label>
        <input type = "text"
        name='name'
        id = "name"
        value = { name }
        placeholder = "Enter name of product"
        required onChange = {
            (e) => setName(e.target.value)
        }/>
    </div>
    <div   className="flex flex-col mb-4">
    <label className="mb-4 text-2xl font-medium"  htmlFor = "category">Category</label>
        <input
     type = "text"
     name='category'
        id = "category"
        value = { category }
        placeholder = "Enter products category"
        required onChange = {
            (e) => setCategory(e.target.value)
        }
        />
    </div>
    <div  className="flex flex-col mb-4">
    <label className="mb-4 text-2xl font-medium" htmlFor = "name">Price</label>
        <input
     type = "text"
     name='price'
        id = "price"
        value = { price }
        placeholder = "Enter price of product"
        required onChange = {
            (e) => setPrice(e.target.value)
        }
        />
    </div>
    <div  className="flex flex-col mb-4">
    <label className="mb-4 text-2xl font-medium" htmlFor = "countInStock">Count in Stock</label>
        <input
     type = "text"
        id = "countInStock"
        name="countInStock"
        value = { countInStock }
        placeholder = "Enter number of products in stock"
        required onChange = {
            (e) => setCountInStock(e.target.value)
        }
        />
    </div>
    <div  className="flex flex-col mb-4">
    <label className="mb-4 text-2xl font-medium" htmlFor = "brand">Brand</label>
        <input
     type = "text"
        id = "brand"
        name='brand'
        value = { brand }
        placeholder = "Enter brand of product"
        required onChange = {
            (e) => setBrand(e.target.value)
        }
        />
    </div>
    <div   className="flex flex-col mb-4">
    <label className="mb-4 text-2xl font-medium" htmlFor = "image">Image</label>
        <input
     type = "file"
     name='image'
        id = "image"
        placeholder = "Enter Image of the product"
        required onChange = {
            (e) => setImagery(e.target.files[0])
        }
        />
    </div>
    <div className="flex flex-col mb-4">
    <label className="mb-4 text-2xl font-medium" htmlFor = "description">Description</label>
        <textarea
     type = "text"
        id = "description"
        name='description'
        value = { description }
        placeholder = "Enter product's description"
        required onChange = {
            (e) => setDescription(e.target.value)
        }
        />
    </div>
    <div className="flex flex-col mb-4">
    <button className="primary mb-4" type="submit">{ id ? "Update" : "Add Product" }</button>
   {/*  <button className = "block bg-teal-600 "  onClick = {
                    () => setModalVisible(false)
                }
                type = "submit">
                    Cancel
                </button> */}
                </div>
</form>

<div className="w-full md:w-3/4 md:p-6 md:py-10">
    <table className='w-full p-2 table-row md:table-auto'>
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Count in stock</th>
            <th>Price</th>
            <th>Action</th>
            </tr>
            <th></th>
        </thead>
        <tbody className="">
            {products.map((product) =>(
                <tr key={product.id} className="py-6 px-2 border">
                    <td className='border p-1'>{product._id}</td>
                    <td className='border p-1'>{product.name}</td>
                    <td className='border p-1'>{product.category}</td>
                    <td className='border p-1'>{product.brand}</td>
                    <td className='border p-1'>{product.description}</td>
                    <td className='border p-1' >{product.countInStock}</td>
                    <td className='border p-1'>{product.price}</td>
                    <td className='border p-2 flex flex-row'>
                        <button className="bg-gray-800 mx-2 text-slate-100 border-none transition ease-in-out hover:scale-95 duration-100 hover:border-none" onClick={ () => openModal(product)}>Edit</button>
                    <button className=" bg-red-500 text-slate-100 border-none  transition ease-in-out hover:scale-95 duration-100 hover:border-none" onClick = { () =>{
                          if(window.confirm(`Are you sure you want to delete product ${product.name}`)){deleteHandler(product)};
                           
                    
                     }
                } >Delete</button>
                    </td>
                    <td></td>
                    

                </tr>
                

            ))}
        </tbody>
    </table>
</div>


</div>

    )
}