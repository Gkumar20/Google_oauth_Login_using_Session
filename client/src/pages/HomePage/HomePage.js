import React, { useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
          withCredentials: true, // Include credentials in the request (cookies)
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    authenticateUser();
  }, []);

  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
    </div>
  );
};

export default HomePage;
