import { Outlet } from 'react-router-dom';
import HeaderTW from './components/HeadingTailwindUI'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <HeaderTW />
      <ToastContainer />
      <section className='my-2'>
        <Outlet />
      </section>
      
    </>
  );
};

export default App