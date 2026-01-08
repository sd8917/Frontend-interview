import { useState } from "react";
import Modal from "./Model";


export const Products = () => {

     const [isModalOpen, setModalOpen] = useState(false);
     const [selectedProduct, setSelectedProduct] = useState({})

    const products = [
        { id: 1, title: "My product 1", description: "My description 1", price: 400 },
        { id: 2, title: "My product 2", description: "My description 2", price: 80 },
        { id: 3, title: "My product 3", description: "My description 3", price: 900 },
        { id: 4, title: "My product 4", description: "My description 4", price: 5600 },
        { id: 5, title: "My product 5", description: "My description 5", price: 3400 },
        { id: 6, title: "My product 6", description: "My description 6", price: 280 }
    ]

    const openModel = (product : any) => {
        setSelectedProduct(product)
        setModalOpen(true)
    }
    return (
        <div>

            {products.map((product) => (
                <div key={product.id} className='card'>
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <div>{product.price}</div>
                    <button className='btn' onClick={()=>openModel(product)}>
                        Add to cart
                    </button>
                </div>
            ))}

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>Added to Cart 🛒</h2>
                <p>{(selectedProduct as any)?.title}</p>
                <p>{(selectedProduct as any)?.price}</p>

                <div style={{ marginTop: "16px" }}>
                    <button onClick={() => setModalOpen(false)}>Continue Shopping</button>
                </div>
            </Modal>


        </div>
    )
}
