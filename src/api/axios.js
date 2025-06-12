import axios from 'axios';

export default axios.create({
  baseURL: 'https://ch-server-flru.onrender.com', // Update with your server URL
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Adjust as needed for CORS
  },
});
