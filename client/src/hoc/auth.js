import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

/**
  * ### SpecificComponent
  * LandingPage component, etc...
  *
  * ### option
  * null: A page that anyone can access
  * true: A page that only logged in users can access
  * false: A page that cannot be accessed by logged in users
  */
export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Run every time the page is accessed so that we can check the permissions
    useEffect(() => {
      // Value returned by auth action function (=value to be passed to reducer)
      dispatch(auth()).then((response) => {
        // Information obtained by processing in the backend (isAuth check)


       // not logged in
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login');
          }
        } else {
         // If you are logged in and do not have administrator privileges, but access the administrator page
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
           // When accessing the login or membership registration page while logged in
            if (option === false) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
