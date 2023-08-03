

const Hero = () => {
  return (
    <div className=' py-5'>
      <section className='d-flex justify-content-center'>
        <section className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Welcome to GoalSense</h1>
          <p className='text-center mb-4'>
            Track your goals with a simple, easy to use interface.
          </p>
          <div className='d-flex'>
            <a href='/login'>
            <button className='me-3'>
              Sign In
            </button>
            </a>
            <a href='/register'>
            <button className='me-3'>
              Sign Up
            </button>
            </a>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Hero;