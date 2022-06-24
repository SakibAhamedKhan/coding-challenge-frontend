import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Swal from 'sweetalert2';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const Form = () => {
    const [users, setUsers] = useState([]);
    const [select, setSelect] = useState({});
    const [url, setUrl] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const particlesInit = async (main) => {
        console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
    const mapContainerStyle = {
        height: "400px",
        width: "400px"
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const body = event.target.body.value;
        const title = event.target.title.value;
        console.log(body, title, select);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: select.name,
                body: body,
                title: title
            })
        })
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    Swal.fire(
                        `${res.status}`,
                        'Successfully posted',
                        'success'
                    )
                } else {
                    Swal.fire(
                        res.status,
                        'Unsuccessfull',
                        'error'
                    )
                }

                return res.json()
            })
            .then(data => console.log(data))
        event.target.reset();
    }



    return (
       <>
        <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
            position: '50% 50%',
            repeat: 'no-repeat',
            size: 'cover'
        },
        fullScreen: {
            zIndex: 2
        },
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'repulse'
                },
                onHover: {
                    enable: true,
                    mode: 'bubble'
                }
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 0.3,
                    opacity: 0.4,
                    size: 4,
                    divs: {
                        distance: 200,
                        duration: 0.4,
                        mix: false,
                        selectors: []
                    }
                },
                grab: {
                    distance: 400,
                    links: {
                        opacity: 0.5
                    }
                },
                repulse: {
                    divs: {
                        distance: 200,
                        duration: 0.4,
                        factor: 100,
                        speed: 1,
                        maxSpeed: 50,
                        easing: 'ease-out-quad',
                        selectors: []
                    }
                }
            }
        },
        particles: {
            links: {
                color: {
                    value: '#000000'
                },
                distance: 500,
                opacity: 0.4,
                width: 2
            },
            move: {
                attract: {
                    rotate: {
                        x: 600,
                        y: 1200
                    }
                },
                direction: 'bottom',
                enable: true,
                outModes: {
                    bottom: 'out',
                    left: 'out',
                    right: 'out',
                    top: 'out'
                }
            },
            number: {
                density: {
                    enable: true
                },
                value: 400
            },
            opacity: {
                random: {
                    enable: true
                },
                value: {
                    min: 0.1,
                    max: 0.2
                },
                animation: {
                    speed: 1,
                    minimumValue: 0.1
                }
            },
            size: {
                random: {
                    enable: true
                },
                value: {
                    min: 1,
                    max: 3
                },
                animation: {
                    speed: 40,
                    minimumValue: 0.1
                }
            }
        }
    }}
    />
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-10 mx-10 gap-10 z-10'>
            <div className='justify-self-center md:justify-self-center lg:justify-self-start order-2'>
                <form onSubmit={handleSubmit}>
                    <select onClick={e => {
                        if (e.target.value !== 'Select the user') {
                            setSelect(users[e.target.value]);
                            setLat(users[e.target.value].address.geo.lat);
                            setLng(users[e.target.value].address.geo.lng);
                        }

                    }} class="select select-bordered w-full max-w-xs" required>
                        <option value='' disabled selected>Select the user</option>
                        {
                            users.map((user, index) => <option
                                key={user.id}
                                value={index}
                            >{user.name}</option>)
                        }
                    </select>
                    <input type="text" placeholder="Body" class="input input-bordered w-full max-w-xs block mt-3" name="body" required/>
                    <textarea class="textarea textarea-bordered w-full max-w-xs mt-3" placeholder="Title" name="title" required></textarea>
                    <button className='btn w-full max-w-xs mt-3'>Submit</button>
                </form>
            </div>
            <div className='justify-self-center md:justify-self-center lg:justify-self-end  order-1'>
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
                    <p className='my-2 text-center text-xl text-white'>Lat: {lat !== '' ? lat : '0'}</p>
                    <p className='my-2 text-center text-xl text-white'>Lng: {lng !== '' ? lng : '0'}</p>
                </div>
            </div>
        </div>
       </>
    );
};


export default Form;