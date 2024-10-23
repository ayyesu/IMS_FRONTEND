import {Fragment, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {PlusIcon} from '@heroicons/react/24/outline';
import {apiUrl} from '../api/api';

export default function AddSale({
    addSaleModalSetting,
    products,
    stores,
    handlePageUpdate,
    authContext,
}) {
    const [sale, setSale] = useState({
        userID: authContext.user,
        productID: '',
        storeID: '',
        stockSold: '',
        saleDate: '',
    });
    const [error, setError] = useState(''); // For error handling
    const [loading, setLoading] = useState(false); // Loading state for the form submission
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);

    // Handling Input Change for input fields
    const handleInputChange = (key, value) => {
        setSale({...sale, [key]: value});
    };

    // Validate form inputs
    const validateForm = () => {
        if (
            !sale.productID ||
            !sale.storeID ||
            !sale.stockSold ||
            !sale.saleDate
        ) {
            return false;
        }
        return true;
    };

    // POST Data to add a new sale
    const addSale = () => {
        // Validate form before submitting
        if (!validateForm()) {
            setError('Please fill in all required fields.');
            return;
        }

        // Clear previous errors and show loading indicator
        setError('');
        setLoading(true);

        // Send POST request
        fetch(`${apiUrl}/api/sales/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale), // Send sale data
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add sale'); // Handle HTTP errors
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                // Stop loading and reset error state
                setLoading(false);
                alert('Sale added successfully');

                // Trigger parent component update and close the modal
                handlePageUpdate();
                addSaleModalSetting();
            })
            .catch((err) => {
                // Stop loading and display error message
                setLoading(false);
                setError('Failed to add sale, please try again.');
                console.error('Error adding sale:', err); // Log error for debugging
            });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                                            <PlusIcon
                                                className='h-6 w-6 text-blue-400'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-lg py-4 font-semibold leading-6 text-gray-900'
                                            >
                                                Add Sale
                                            </Dialog.Title>
                                            {error && (
                                                <p className='text-sm text-red-600 mb-2'>
                                                    {error}
                                                </p>
                                            )}
                                            <form>
                                                <p className='text-sm text-gray-500 dark:text-gray-400'>
                                                    Fill in the details of the
                                                    product you have sold.
                                                </p>
                                                <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                                                    <div>
                                                        <label
                                                            htmlFor='productID'
                                                            className='block mb-2 text-sm font-medium text-gray-900'
                                                        >
                                                            Product Name
                                                        </label>
                                                        <select
                                                            id='productID'
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                                            name='productID'
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <option value=''>
                                                                Select Product
                                                            </option>
                                                            {products.map(
                                                                (product) => (
                                                                    <option
                                                                        key={
                                                                            product._id
                                                                        }
                                                                        value={
                                                                            product._id
                                                                        }
                                                                    >
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor='stockSold'
                                                            className='block mb-2 text-sm font-medium text-gray-900'
                                                        >
                                                            Stock Sold
                                                        </label>
                                                        <input
                                                            type='number'
                                                            name='stockSold'
                                                            id='stockSold'
                                                            value={
                                                                sale.stockSold
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                                            placeholder='0 - 999'
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor='storeID'
                                                            className='block mb-2 text-sm font-medium text-gray-900'
                                                        >
                                                            Store Name
                                                        </label>
                                                        <select
                                                            id='storeID'
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                                            name='storeID'
                                                            value={
                                                                stores.storeID
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <option value=''>
                                                                Select Store
                                                            </option>
                                                            {stores.map(
                                                                (store) => (
                                                                    <option
                                                                        key={
                                                                            store._id
                                                                        }
                                                                        value={
                                                                            store._id
                                                                        }
                                                                    >
                                                                        {
                                                                            store.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor='saleDate'
                                                            className='block mb-2 text-sm font-medium text-gray-900'
                                                        >
                                                            Sale Date
                                                        </label>
                                                        <input
                                                            type='date'
                                                            id='saleDate'
                                                            name='saleDate'
                                                            value={
                                                                sale.saleDate
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
                                        onClick={addSale}
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? 'Adding...' : 'Add Sale'}
                                    </button>
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                        onClick={addSaleModalSetting}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
