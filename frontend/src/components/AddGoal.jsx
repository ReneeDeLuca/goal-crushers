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
        <button
            type='button'
            className='my-3'
            onClick={() => setShowAddGoal(true)}
        >
            Add Goal
        </button>
        <div> { showAddGoal ? 
        <FormContainer>
            <h1>Add Goal</h1>

            <form onSubmit={submitHandler}>
                <div className='my-2 title'>
                    <label>Goal Title</label>
                    <input 
                        type='text'
                        placeholder='Enter goal title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-describedby="titleHelpBlock"
                    ></input>
                    <span>
                        Enter your goal title here. Be as specific as you like. For example: Play guitar for 30 minutes every day for 1 year or Cook at home today. 
                    </span>
                </div>
                <div className='my-2 endDate'>
                    <label>End Date</label>
                    <input
                        type="date"
                        name="datepic"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className='my-2 isPublic'>
                    <label>Make your goal private?</label>
                    <input 
                        type="switch"
                        label="Make your goal private?"
                        aria-label='Make your goal private?'
                        onChange={togglePublic}
                    ></input>
                </div>
                <button
                    type= 'submit'
                    className='mt-3'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading…' : 'Submit'}
                </button>
                {'   '}
                <button 
                    type='button' 
                    className='mt-3'
                    onClick={() => setShowAddGoal(false)}
                >
                    Cancel
                </button>
            </form>

        </FormContainer>
        : null } </div>
        </>
    )};

export default AddGoal;