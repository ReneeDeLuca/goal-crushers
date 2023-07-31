import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/mainApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <nav >
        <ul>
          <li><a href='/'>GoalSense</a></li>
          <li className='ms-auto'>
            {userInfo ? (
              <>
                <ul>
                  <li id='username'>{userInfo.name}</li>

                  <li><a href='/profile'>     Dashboard</a></li>

                  <li><a href='/profile'>Feed</a></li> 

                  <li><a href='/profile'>Profile</a></li>

                  <li><a href='/profile'>Settings</a></li> 

                  <li onClick={logoutHandler}><a href='/login'>Logout</a></li>
                </ul>
                </>
              ) : (
                <>
                  <li><a href='/login'>Sign In</a></li>
                  <li><a href='/register'>Sign Up</a></li>
                </>
              )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;