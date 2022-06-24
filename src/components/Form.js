import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Swal from 'sweetalert2';


const Form = () => {
    const [users, setUsers] = useState([]);
    const [select, setSelect] = useState({});
    const [url, setUrl] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
    const mapContainerStyle = {
        height: "400px",
        width: "400px"
    }


    const handleSubmit  = (event) => {
        event.preventDefault();
        const body = event.target.body.value;
        const title = event.target.title.value;
        console.log(body,title, select);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({name: select.name, 
            body: body,
            title: title
            })
        })
        .then(res => {
            console.log(res.status);
            if(res.status === 201){
                Swal.fire(
                    '201',
                    'Successfully posted',
                    'success'
                  )
            } else {
                Swal.fire(
                    '404',
                    'Unsuccessfull',
                    'error'
                  )
            }
           
            return res.json()
        })
        .then(data => console.log(data))
        
    }


    // url = `https://maps.google.com/maps?q=22.320370,91.832630&hl=es;z=14&amp;output=embed`;

    console.log(typeof (lat), lng);
    return (
        <div className='grid grid-cols-2 my-10 mx-10'>
            <div className='justify-self-center'>
                <form onSubmit={handleSubmit}>
                    <select onClick={e => {
                        if (e.target.value !== 'Select the user') {
                            setSelect(users[e.target.value]);
                            setLat(users[e.target.value].address.geo.lat);
                            setLng(users[e.target.value].address.geo.lng);
                        }

                    }} class="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select the user</option>
                        {
                            users.map((user, index) => <option
                                key={user.id}
                                value={index}
                            >{user.name}</option>)
                        }
                    </select>
                    <input type="text" placeholder="Body" class="input input-bordered w-full max-w-xs block mt-3" name="body" />
                    <textarea class="textarea textarea-bordered w-full max-w-xs mt-3" placeholder="Title" name="title"></textarea>
                    <button className='btn'>Submit</button>
                </form>
            </div>
            <div className=''>
                <div id='googleMap'>
                    <LoadScript
                        googleMapsApiKey="AIzaSyDlnULnpJNLRpq10--SWMIbwrjXZ5fHflY"
                    >
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                            zoom={12}
                        >
                        </GoogleMap>
                    </LoadScript>
                    <p>Lat: {lat !== '' ? lat : '0'}</p>
                    <p>Lng: {lng !== '' ? lng : '0'}</p>
                </div>
            </div>
        </div>
    );
};


export default Form;