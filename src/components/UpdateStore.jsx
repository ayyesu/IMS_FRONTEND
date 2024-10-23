import React, {useState, useEffect, useContext} from 'react';
import {apiUrl} from '../api/api';
import AuthContext from '../AuthContext';

const EditStore = ({store, onClose, fetchData, handlePageUpdate}) => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (store) {
            setUserId(authContext.user);
            setName(store.name);
            setAddress(store.address);
            setCity(store.city);
            setCategory(store.category);
        }
    }, [store]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedStore = {
            userId,
            name,
            address,
            category,
            city,
        };

        fetch(`${apiUrl}/api/store/update/${store._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStore),
        })
            .then((response) => {
                if (response.ok) {
                    fetchData();
                    handlePageUpdate();
                    onClose(); // Close the modal
                } else {
                    alert('Failed to update store, please try again');
                }
            })
            .catch((error) => {
                console.error('Error updating store:', error);
            });
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-md w-1/3'>
                <h2 className='text-xl font-bold mb-4'>Edit Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>
                            Store Name
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='border border-gray-300 rounded p-2 w-full'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='category'
                            className='block text-sm font-medium text-gray-900'
                        >
                            Category
                        </label>
                        <select
                            id='category'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500'
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value=''>Select Category</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Groceries'>Groceries</option>
                            <option value='Wholesale'>WholeSale</option>
                            <option value='SuperMart'>SuperMart</option>
                            <option value='Phones'>Phones</option>
                            <option value='Clothing'>Clothing</option>
                            <option value='Shoes'>Shoes</option>
                            <option value='Bags'>Bags</option>
                            <option value='Accessories'>Accessories</option>
                            <option value='Others'>Others</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='border border-gray-300 rounded p-2 w-full'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>City</label>
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className='border border-gray-300 rounded p-2 w-full'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='bg-gray-300 hover:bg-gray-400 text-black font-bold p-2 rounded mr-2'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded'
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStore;
