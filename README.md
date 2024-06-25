# Truexgold

Deployed link - `https://truex-backend.vercel.app/`

## Register User’s data
Request: `POST`  
Route: `/api/users/register`  
Example: (Using axios)  
const username = ‘Username’; // Get username from the frontend  
axios.post('https://truex-backend.vercel.app/api/users/register', { username });  

## Get User’s data
Request: `GET`  
Route: `/api/users/:userId`  
Example: (Using axios)  
const userId = ‘UserId; // Get user id from localstorage. The user id is stored in the localstorage after registering the user’s data  
axios.post(`https://truex-backend.vercel.app/api/users/${userId}`);  

## Admin Login
Request: `POST`  
Route: `/api/admin/login`  
Example: (Using axios)  
const username = ‘admin’; // Default username  
const email = ‘admin@gmail.com’; // Default email  
const password = ‘123456789’; // Default password  
axios.post(`https://truex-backend.vercel.app/api/admin/login`, { username, email, password });  

## Create task
Request: `POST`  
Route: `/api/tasks/create`  
Example: (Using axios)  
const title = ‘Task title; // Get from admin  
const description = ‘This is the first task’; // Get from admin  
const reward = ‘1000’; // Get from admin  
const token = ‘admin-token’ // Saved in localstorage from admin login  
axios.post(`https://truex-backend.vercel.app/api/tasks/create`, { username, email, password }, { ‘Authorization’: `Bearer ${token}` });  

## Get task
Request: `GET`  
Route: `/api/tasks/`  
Example: (Using axios)  
axios.get('https://truex-backend.vercel.app/api/tasks/');  