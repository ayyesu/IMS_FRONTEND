import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import UploadImage from '../components/UploadImage';
import {apiUrl} from '../api/api';
import LogoImage from '../assets/logo.png';
import LoginImage from '../assets/Login.png';

function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

    console.log('apiUrl', apiUrl);

    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();

    // Handling Input change for registration form.
    const handleInputChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    // Register User
    const registerUser = () => {
        setIsRegistering(true);
        fetch(`${apiUrl}/api/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((result) => {
                setIsRegistering(false);
                alert(
                    'Successfully Registered, Proceed to Login with your details',
                );
                navigate('/login');
            })
            .catch((err) => {
                setIsRegistering(false);
                console.log('Something went wrong ', err);
            });
    };
    // ------------------

    // // Uploading image to cloudinary
    // const uploadImage = async (image) => {
    //   const data = new FormData();
    //   data.append("file", image);
    //   data.append("upload_preset", "IMS");

    //   await fetch("https://api.cloudinary.com/v1_1/dpycrecvh/image/upload", {
    //     method: "POST",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setForm({ ...form, imageUrl: data.url });
    //       alert("Image Successfully Uploaded");
    //     })
    //     .catch((error) => console.log(error));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center'>
                <div className='w-full max-w-md space-y-8  p-10 rounded-lg'>
                    <div>
                        <img
                            className='mx-auto h-12 w-auto'
                            src={LogoImage}
                            alt='Your Company'
                        />
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Register your account
                        </h2>
                    </div>
                    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                        {/* <input type="hidden" name="remember" defaultValue="true"  /> */}
                        <div className='flex flex-col gap-4 -space-y-px rounded-md shadow-sm'>
                            <div className='flex gap-4'>
                                <input
                                    name='firstName'
                                    type='text'
                                    required
                                    className='relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='First Name'
                                    value={form.firstName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    name='lastName'
                                    type='text'
                                    required
                                    className='relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Last Name'
                                    value={form.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='email-address'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Email address'
                                    value={form.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Password'
                                    value={form.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    name='phoneNumber'
                                    type='number'
                                    autoComplete='phoneNumber'
                                    required
                                    className='relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Phone Number'
                                    value={form.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                disabled={isRegistering}
                                className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                onClick={registerUser}
                            >
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                                {isRegistering ? 'Registering...' : 'Register'}
                            </button>
                            <p className='mt-2 text-center text-sm text-gray-600'>
                                Or{' '}
                                <span className='font-medium '>
                                    Already Have an Account?{' '}
                                    <Link
                                        className='text-indigo-600 hover:text-indigo-500'
                                        to='/login'
                                    >
                                        {' '}
                                        Please Login{' '}
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center order-first sm:order-last'>
                    <img src={LoginImage} alt='register logo' />
                </div>
            </div>
        </>
    );
}

export default Register;
