import React from 'react';
import Swal from 'sweetalert2'
import Form from './Form';

const Modal = () => {
    const showModal = () => {
        Swal.fire({
            html: `
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 style="color:white;text-align:center;" class="card-title ">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            `,
            background: 'black',
            showConfirmButton: false,
            confirmButtonColor: '#5eb386',
        })
    }
    return (
        <div>
            <button style={{
                backgroundColor: 'white',
                color: 'black'
            }} onClick={showModal}>Modal</button>
        </div>
    );
};

export default Modal;