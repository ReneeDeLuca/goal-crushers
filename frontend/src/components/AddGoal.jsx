import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
        <Button
            type='button'
            variant='primary'
            className='my-3'
            onClick={() => setShowAddGoal(true)}
        >
            Add Goal
        </Button>
        <div> { showAddGoal ? 
        <FormContainer>
            <h1>Add Goal</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='title'>
                    <Form.Label>Goal Title</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter goal title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-describedby="titleHelpBlock"
                    ></Form.Control>
                    <Form.Text id="passwordHelpBlock" muted>
                        Enter your goal title here. Be as specific as you like. For example: Play guitar for 30 minutes every day for 1 year or Cook at home today. 
                    </Form.Text>
                </Form.Group>
                <Form.Group className='my-2' controlId='endDate'>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="datepic"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId='public'>
                    <Form.Label>Make your goal private?</Form.Label>
                    <Form.Check // prettier-ignore
                        type="switch"
                        label="Make your goal private?"
                        aria-label='Make your goal private?'
                        onChange={togglePublic}
                    ></Form.Check>
                </Form.Group>
                <Button
                    type= 'submit'
                    variant="primary"
                    className='mt-3'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading…' : 'Submit'}
                </Button>
                {'   '}
                <Button 
                    type='button' 
                    variant='primary' 
                    className='mt-3'
                    onClick={() => setShowAddGoal(false)}
                >
                    Cancel
                </Button>
            </Form>

        </FormContainer>
        : null } </div>
        </>
    )};

export default AddGoal;