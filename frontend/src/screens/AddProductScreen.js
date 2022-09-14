import React, { useState, useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts, saveProduct } from "../actions/productActions";

export default function AddProductScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
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
                image,
                category,
                description,
                brand,
                countInStock,
            })
        );
    };
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };
    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
    };

    return ( 
       
        <div className = " col-12 container content-margined">
            <div className="col-12">
<div className = "product-header">
    <h3>Products</h3>
    <button className="primary btn-create" onClick={()=> openModal({})}>Create Product</button>

</div>
</div>
{modalVisible && (
<form onSubmit={submitHandler}>
    <div className="header">
        <h2>{ id ?  "Update Product" : "Create new Product" }</h2>cd c
    </div>
    <div className="form-inputs">
        <label htmlFor = "name">Name</label>
        <input type = "text"
        id = "name"
        value = { name }
        placeholder = "Enter name of product"
        required onChange = {
            (e) => setName(e.target.value)
        }/>
    </div>
    <div  className="form-inputs">
    <label htmlFor = "category">Category</label>
        <input
     type = "text"
        id = "category"
        value = { category }
        placeholder = "Enter products category"
        required onChange = {
            (e) => setCategory(e.target.value)
        }
        />
    </div>
    <div  className="form-inputs">
    <label htmlFor = "name">Price</label>
        <input
     type = "text"
        id = "price"
        value = { price }
        placeholder = "Enter price of product"
        required onChange = {
            (e) => setPrice(e.target.value)
        }
        />
    </div>
    <div  className="form-inputs">
    <label htmlFor = "countInStock">Count in Stock</label>
        <input
     type = "text"
        id = "countInStock"
        value = { countInStock }
        placeholder = "Enter number of products in stock"
        required onChange = {
            (e) => setCountInStock(e.target.value)
        }
        />
    </div>
    <div  className="form-inputs">
    <label htmlFor = "brand">Brand</label>
        <input
     type = "text"
        id = "brand"
        value = { name }
        placeholder = "Enter brand of product"
        required onChange = {
            (e) => setBrand(e.target.value)
        }
        />
    </div>
    <div  className="form-inputs">
    <label htmlFor = "image">Image</label>
        <input
     type = "text"
        id = "image"
        value = { image }
        placeholder = "Enter Image of the product"
        required onChange = {
            (e) => setImage(e.target.value)
        }
        />
    </div>
    <div className="form-inputs">
    <label htmlFor = "description">Description</label>
        <textarea
     type = "text"
        id = "name"
        value = { description }
        placeholder = "Enter product's description"
        required onChange = {
            (e) => setDescription(e.target.value)
        }
        />
    </div>
    <div className="form-inputs form-buttons">
    <button className="primaryy" type="submit">{ id ? "Update" : "Add Product" }</button>
    <button className = "secondaryy"  onClick = {
                    () => setModalVisible(false)
                }
                type = "submit">
                    Back
                </button>
                </div>
</form>
)}
<div className="product-list">
    <table>
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
        <tbody>
            {products.map((product) =>(
                <tr>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.price}</td>
                    <td><button className="btn-edit" onClick={ () => openModal(product)}>Edit</button>
                    <button className="btn-delete" onClick = {
                    () => deleteHandler(product)
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