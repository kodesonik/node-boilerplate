# NODE API BOILERPLATE

> The Boilerplate for Node Backend development with Typescript and Prisma in Clean Architecture

___

![Logo](./public/assets/img/logo.png)

### Project set up

- Start By cloning this project on [github](#)
- Install dependencies with
  ```
      npm install
  ```
- Start the server 
  ```
     npm run start
  ```
---

  ### Make http requests

> The request files are in the *docs/requests/* folder.


1. Authentication
 Sign up
   - Login by email and password
   - Confirm Email
   - Login Phone number
   - Confirm OTP
   - Logout
   - Change password
   - Reset password
   - Refresh token

---

2. Country
   - Add 
   - edit
   - delete
   - get all
   - get by id
   - get in trash
   - restore
  
---

3. User
   - Add 
   - edit
   - delete
   - get all
   - get by id
   - get in trash
   - restore

---

4. Preference
   - Add 
   - edit
   - delete
   - get all
   - get by id
   - get in trash
   - restore

---

5. Vehicle
   - Add 
   - edit
   - delete
   - get all
   - get by user
   - get by id
   - get Trips
   - get in trash
   - restore

---

6. Trip
    - Add
    - Cancel
    - edit
    - Check passenger
    - get by user
    - get by id
    - get routes
    - get stop
    - add stop
    - remove stop

---

7. Travel
   - Search for a trip
   - Get a trip infos
   - Get trip driver infos
   - Get trip vehicle infos
   - Get trip stops infos
   - Choose/join a trip
   - Report departure
   - Report arrival
   - Report problem
   - Client rating
   - driver rating
   - get by user
  
---

8. Payment
    - Receive mobile money
    - Send mobile money
    - Debit from a bank account
    - Transfer to a bank account
    - get by user
    - get transaction status
  
---

9.  Notification
    - publish
    - get sended notifications
    - get received notifications
  
---

10.  Historic

     - get All
     - get by user
     - get by role

---

11.   Statistics
      - get the number of users
      - get the number of passengers
      - get the number of administrators
      - get the number of drivers
      - get the number of trips
      - get the number of trips of the day
      - get the number of travels of the day