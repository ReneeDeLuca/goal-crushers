import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Goal = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>{title}</h1>
          <span>{createdAt}</span>
          <span>{endDate}</span>
          <span>{isPublic ? 'Public' : 'Private'}</span>
          <div className='d-flex'>
            <LinkContainer to='/edit/:id'>
            <Button variant='primary' className='me-3'>
              Update
            </Button>
            </LinkContainer>
            
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Goal;