import React, {useState, useEffect, useContext} from 'react';
import AddStore from '../components/AddStore';
import EditStore from '../components/UpdateStore'; // New component for editing
import AuthContext from '../AuthContext';
import {apiUrl} from '../api/api';
import LocationIcon from '../assets/location-icon.png';

function Store() {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false); // State for edit modal
    const [stores, setAllStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null); // State to hold selected store for editing
    const authContext = useContext(AuthContext);
    const [updatePage, setUpdatePage] = useState(true);

    useEffect(() => {
        fetchData();
    }, [updatePage]);

    // Fetching all stores data
    const fetchData = () => {
        fetch(`${apiUrl}/api/store/get/${authContext.user}`)
            .then((response) => response.json())
            .then((data) => {
                setAllStores(data);
            });
    };

    const modalSetting = () => {
        setShowModal(!showModal);
    };

    const handleEdit = (store) => {
        setSelectedStore(store);
        setEditModal(true);
    };

    const handlePageUpdate = () => {
        setUpdatePage(!updatePage);
    };

    const handleDelete = (storeId) => {
        if (window.confirm('Are you sure you want to delete this store?')) {
            fetch(`${apiUrl}/api/store/delete/${storeId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        fetchData(); // Refresh the store list after deletion
                        alert('Store deleted successfully'); // Optional success message
                    } else {
                        alert('Failed to delete store'); // Handle deletion failure
                    }
                })
                .catch((error) =>
                    console.error('Error deleting store:', error),
                );
        }
    };

    return (
        <div className='col-span-12 lg:col-span-10 flex justify-center'>
            <div className='flex flex-col gap-5 w-11/12 border-2'>
                <div className='flex justify-between'>
                    <span className='font-bold'>Manage Store</span>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded'
                        onClick={modalSetting}
                    >
                        Add Store
                    </button>
                </div>

                {showModal && (
                    <AddStore onClose={modalSetting} fetchData={fetchData} />
                )}
                {editModal && (
                    <EditStore
                        store={selectedStore}
                        onClose={() => setEditModal(false)}
                        fetchData={fetchData}
                        handlePageUpdate={handlePageUpdate}
                    />
                )}

                {stores.map((element) => (
                    <div
                        className='bg-white w-50 h-fit flex flex-col gap-4 p-4'
                        key={element._id}
                    >
                        <div className='flex flex-col gap-3 justify-between items-start'>
                            <span className='font-bold'>{element.name}</span>
                            <div className='flex'>
                                <img
                                    alt='location-icon'
                                    className='h-6 w-6'
                                    src={LocationIcon}
                                />
                                <span>
                                    {element.address + ', ' + element.city}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span>
                                <strong>Category:</strong>{' '}
                                <span className='border border-blue-500 rounded p-1 text-blue-500'>
                                    {element.category}
                                </span>
                            </span>
                        </div>
                        <div className='flex justify-end gap-5'>
                            <button
                                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-2 text-xs rounded'
                                onClick={() => handleEdit(element)}
                            >
                                Edit
                            </button>
                            <button
                                className='bg-red-500 hover:bg-red-700 text-white font-bold p-2 text-xs rounded'
                                onClick={() => handleDelete(element._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Store;
