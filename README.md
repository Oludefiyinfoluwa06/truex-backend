# Truexgold

Deployed link - `https://truex-backend.vercel.app/`

## Register User’s data
Request: `POST`  
Route: `/api/users/register`  
Example: (Using axios)  
```javascript
const username = 'Username'; // Get username from the frontend
axios.post(`https://truex-backend.vercel.app/api/users/register`, { username });
```

## Get User’s data  
Request: `GET`  
Route: `/api/users/:userId`  
Example: (Using axios)  
```javascript
const userId = 'UserId'; // Get user id from localstorage. The user id is stored in the localstorage after registering the user’s data
axios.get(`https://truex-backend.vercel.app/api/users/${userId}`);
```

## Admin Login
Request: `POST`  
Route: `/api/admin/login`  
Example: (Using axios)  
```javascript
const username = 'admin'; // Default username  
const email = 'admin@gmail.com'; // Default email  
const password = '123456789'; // Default password  
axios.post(`https://truex-backend.vercel.app/api/admin/login`, { username, email, password });
```

## Request Password Reset Code
Request: `POST`  
Route: `/api/admin/requestResetCode`  
Example: (Using axios)  
```javascript
const email = 'admin@gmail.com'; // Default email  
axios.post(`https://truex-backend.vercel.app/api/admin/requestResetCode`, { email });
```

## Reset Password
Request: `POST`  
Route: `/api/admin/resetPassword`  
Example: (Using axios)  
```javascript
const email = 'admin@gmail.com'; // Default email  
const resetCode = '1234'; // Reset code  
const newPassword = '123456789'; // New password  
axios.post(`https://truex-backend.vercel.app/api/admin/resetPassword`, { email, resetCode, newPassword });
```

## Create task  
Request: `POST`  
Route: `/api/tasks/create`  
Example: (Using axios)  
```javascript
const title = 'Task title'; // Get from admin  
const description = 'This is the first task'; // Get from admin  
const reward = 1000; // Get from admin  
const token = 'admin-token'; // Saved in localstorage from admin login  
axios.post(`https://truex-backend.vercel.app/api/tasks/create`, { title, description, reward }, { headers: { 'Authorization': `Bearer ${token}` } });
```

## Get tasks
Request: `GET`  
Route: `/api/tasks/`  
Example: (Using axios)  
```javascript
axios.get(`https://truex-backend.vercel.app/api/tasks/`);
```

## Get task by ID
Request: `GET`  
Route: `/api/tasks/:taskId`  
Example: (Using axios)  
```javascript
const taskId = 'task-id';  
axios.get(`https://truex-backend.vercel.app/api/tasks/${taskId}`);
```

## Complete task
Request: `POST`  
Route: `/api/tasks/complete`  
Example: (Using axios)  
```javascript
const userId = 'user-id'; // Get user id from localstorage. The user id is stored in the localstorage after registering the user’s data  
const taskId = 'task-id'; // Get task id from parameter in frontend link
axios.post(`https://truex-backend.vercel.app/api/tasks/complete`, { userId, taskId });
```

## Check if user completed task
Request: `POST`  
Route: `/api/tasks/checkCompletion`  
Example: (Using axios)  
```javascript
const userId = 'user-id'; // Get user id from localstorage
const taskId = 'task-id'; // Get task id from parameter in frontend link
axios.post(`https://truex-backend.vercel.app/api/tasks/checkCompletion`, { userId, taskId });
```

## Update user coins after earning limit has been reach
Request: `PUT`  
Route: `/api/users/updateCoins`  
Example: (Using axios)  
```javascript
const userId = 'user-id'; // Get user id from the frontend
const newCoins = 5000; // New coins value
const token = 'admin-token'; // Saved in localstorage from admin login
axios.put(`https://truex-backend.vercel.app/api/users/update-coins`, { userId, newCoins }, { headers: { 'Authorization': `Bearer ${token}` } });
```

## Get all users data (Admin)
Request: `GET`  
Route: `/api/users/`  
Example: (Using axios)  
```javascript
const token = 'admin-token'; // Saved in localstorage from admin login
axios.get(`https://truex-backend.vercel.app/api/users/`, { headers: { 'Authorization': `Bearer ${token}` } });
```

## Update global earning limit (Admin)
Request: `PUT`  
Route: `/api/settings/globalEarningLimit`  
Example: (Using axios)  
```javascript
const newLimit = 1000000; // New global earning limit
const token = 'admin-token'; // Saved in localstorage from admin login
axios.put(`https://truex-backend.vercel.app/api/settings/globalEarningLimit`, { newLimit }, { headers: { 'Authorization': `Bearer ${token}` } });
```

## Delete task (Admin)
Request: `DELETE`  
Route: `/api/tasks/delete/:taskId`  
Example: (Using axios)  
```javascript
const taskId = 'task-id'; // Get task id from parameter in frontend link
const token = 'admin-token'; // Saved in local storage from admin login
axios.delete(`https://truex-backend.vercel.app/api/tasks/delete/${taskId}`, { headers: { 'Authorization': `Bearer ${token}` } });
```