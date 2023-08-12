import { useState, useEffect } from 'react';
import Goal from '../components/Goal';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useDeleteGoalMutation } from '../slices/goalSlice';
import { useNavigate } from 'react-router-dom';

const DeleteGoalScreen = () => {

    const [showDeleteGoal, setShowDeleteGoal] = useState(false)

    const handleDeleteClick = () => {
        if(showDeleteGoal) {
            document.getElementById('deleteGoalOutline').classList.remove('border-2');
        } else {
            document.getElementById('deleteGoalOutline').classList.add('border-2');
        }
        setShowDeleteGoal(!showDeleteGoal)
    }
    useEffect(() => {
        function simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
        }
    
        if (isLoading) {
        simulateNetworkRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);

    const navigate = useNavigate();
    const [deleteGoal] = useDeleteGoalMutation();
    const [isLoading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
          try {
            const res = await deleteGoal({req.id}).unwrap();
            console.log(res);
            navigate('/user/:id');
            toast.success('Goal deleted successfully');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }

 return (
    <section>
        <FormContainer>
            <Goal />
        </FormContainer>
        <span>
            <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isLoading}
                className="inline-flex text-center items-end rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Delete Goal
            </button>
        </span>
        <div id='deleteGoalOutline' className='rounded-md border-indigo-600 mt-4'> { showDeleteGoal ? 
        <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
            <h1 className='text-xl font-bold text-gray-600'>Are you sure you want to delete this Goal?</h1>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className=" mr-2 hidden sm:block">
                    <button
                        onClick={submitHandler}
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={isLoading}
                    >
                    {isLoading ? 'Loading…' : 'DELETE'}
                    </button>
                </span>
                <span className="ml-2 hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setShowDeleteGoal(false)}
                    >
                    Cancel
                    </button>
                </span>
            </div>
        </FormContainer> : null }
        </div>  
    </section>
)}

export default DeleteGoalScreen;