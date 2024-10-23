import {Fragment, useContext, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {PlusIcon} from '@heroicons/react/24/outline';
import AuthContext from '../AuthContext';
import {apiUrl} from '../api/api';

export default function AddProduct({addProductModalSetting, handlePageUpdate}) {
    const authContext = useContext(AuthContext);
    const [product, setProduct] = useState({
        userId: authContext.user,
        name: '',
        price: '',
        stock: '',
        description: '',
    });
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const cancelButtonRef = useRef(null);

    // Handle input changes for form fields
    const handleInputChange = (key, value) => {
        setProduct({...product, [key]: value});
    };

    // Form validation logic
    const validateProductForm = () => {
        if (!product.name || product.name.trim() === '') {
            setError('Product name is required.');
            return false;
        }
        if (!product.price || product.price <= 0) {
            setError('Valid product price is required.');
            return false;
        }
        if (!product.stock || product.stock < 0) {
            setError('Valid product stock is required.');
            return false;
        }
        return true;
    };

    // Add product functionality
    const addProduct = () => {
        if (!validateProductForm()) {
            return;
        }

        setError('');
        setLoading(true);

        fetch(`${apiUrl}/api/product/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(() => {
                setLoading(false);
                alert('Product added successfully');
                handlePageUpdate(); // Trigger page refresh or update
                addProductModalSetting(); // Close modal
            })
            .catch((err) => {
                setLoading(false);
                setError('Failed to add product, please try again.');
                console.error('Error adding product:', err);
            });
    };

    return (
        // Modal
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
                                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left '>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-lg font-semibold leading-6 text-gray-900 '
                                            >
                                                Add Product
                                            </Dialog.Title>

                                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                                Fill in the details of the
                                                product you want to add.
                                            </p>
                                            <span className='text-red-600 text-sm'>
                                                {error}
                                            </span>
                                            <form action='#' className='mt-4'>
                                                <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                                                    <div>
                                                        <label
                                                            htmlFor='name'
                                                            className='block mb-2 text-sm font-medium text-gray-900 '
                                                        >
                                                            Product Name
                                                        </label>
                                                        <input
                                                            type='text'
                                                            name='name'
                                                            id='name'
                                                            value={product.name}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                                            placeholder='Ex. Apple iMac 27&ldquo;'
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor='price'
                                                            className='block mb-2 text-sm font-medium text-gray-900'
                                                        >
                                                            Price
                                                        </label>
                                                        <input
                                                            type='number'
                                                            name='price'
                                                            id='price'
                                                            value={
                                                                product.price
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                                            placeholder='GH₵'
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor='stock'
                                                            className='block mb-2 text-sm font-medium text-gray-900'
                                                        >
                                                            Stock
                                                        </label>
                                                        <input
                                                            type='number'
                                                            name='stock'
                                                            id='stock'
                                                            value={
                                                                product.stock
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                                            placeholder='0 - 999'
                                                        />
                                                    </div>
                                                    <div className='sm:col-span-2'>
                                                        <label
                                                            htmlFor='description'
                                                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                                        >
                                                            Description
                                                        </label>
                                                        <textarea
                                                            id='description'
                                                            rows='5'
                                                            name='description'
                                                            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                                            placeholder='Write a description...'
                                                            value={
                                                                product.description
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex items-center space-x-4'></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
                                        onClick={addProduct}
                                    >
                                        {loading ? 'Adding...' : 'Add Product'}
                                    </button>
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                        onClick={() => addProductModalSetting()}
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
