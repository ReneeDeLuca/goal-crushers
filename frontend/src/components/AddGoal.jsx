import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useAddGoalMutation } from '../slices/goalSlice';

const AddGoal = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [showAddGoal, setShowAddGoal] = useState(false)

    const handleAddClick = () => {
        if(showAddGoal) {
            document.getElementById('addGoalOutline').classList.remove('border-2');
        } else {
            document.getElementById('addGoalOutline').classList.add('border-2');
        }
        setShowAddGoal(!showAddGoal)
    }

    
    const navigate = useNavigate();

    const [addGoal] = useAddGoalMutation();
    const [isLoading, setLoading] = useState(false);
    
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
    
    const togglePublic = () => setIsPublic(!isPublic);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
          try {
            const res = await addGoal({ title, endDate, isPublic }).unwrap();
            console.log(res);
            navigate('/user/:id');
            toast.success('Goal added successfully');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      
    return (
        <>
        <section className='flex-initial max-w-sm min-h-full flex-col justify-left px-6 py-2 lg:px-8'>
        <span>
            <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAddClick}
            >
            Add Goal
            </button>
        </span>
        <div id='addGoalOutline' className='rounded-md border-indigo-600 mt-4'> { showAddGoal ? 
        <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
            <h1 className='text-xl font-bold text-gray-600'>Add Goal</h1>

            <form onSubmit={submitHandler}>
                <div className='my-4 title'>
                    <label className='mb-2'>Enter a Goal Title</label>
                    <input 
                        className='block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        type='text'
                        placeholder='Be as specific as you like.'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-describedby="titleHelpBlock"
                    ></input>
                    <span className='text-xs text-gray-400'>
                        Eg: Play guitar for 30 minutes every day for 1 year or Cook at home today. 
                    </span>
                </div>
                <hr />
                <div className='my-4 endDate'>
                    <label className='mb-2'>End Date</label>
                    <input
                        className='block w-full rounded-md border-0 pt-0.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 align-middle focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <hr />
                <div className='my-4 isPublic'>
                    <label className='mb-2 mr-4'>Make your goal private?</label>
                    <input 
                        type="checkbox"
                        defaultChecked={isPublic}
                        aria-label='Make your goal private?'
                        onChange={togglePublic}
                    ></input>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className=" mr-2 hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={isLoading}
                    >
                    {isLoading ? 'Loading…' : 'Submit'}
                    </button>
                    </span>
                <span className="ml-2 hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setShowAddGoal(false)}
                    >
                    Cancel
                    </button>
                </span>
                </div>
            </form>

        </FormContainer>
        : null } </div>
        </section>
        </>
    )};

export default AddGoal;