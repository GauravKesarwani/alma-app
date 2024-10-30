## Getting Started

Node v20.17.0
Npm v10.8.2

### Step 1

Clone the repo from the git url: git@github.com:GauravKesarwani/alma-app.git

### Step 2

create a .env file in the root of the project and add the below line. I have used file db using Prisma client.

DATABASE_URL="file:./dev.db"

### Step 3

Run npm install

### Step 4

Run npm run dev

Notes: 
Routes are set up at localhost:3000/user and localhost:3000/admin for assesment and admin pages respectively.
I have used JsonFroms with React Vanilla renderer for assesment form.
I was able to add values using assesment form to file db and render those values on the admin form. 

Technologies used: React, JsonForms, react-paginate for pagination.

Couldn't complete the testing within 24 hr timeframe. Form validation may not be perfect. Styling isn't perfect and can be improved as well. 


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


<img width="1710" alt="Screenshot 2024-10-29 at 10 17 53 PM" src="https://github.com/user-attachments/assets/4f535b10-9441-4794-87f6-db975c55e217">
<img width="1697" alt="Screenshot 2024-10-29 at 10 42 31 PM" src="https://github.com/user-attachments/assets/cd2f45ca-685f-4133-8819-1e1d17d3c76a">


<img width="1427" alt="Screenshot 2024-10-29 at 10 34 44 PM" src="https://github.com/user-attachments/assets/daef49d3-2fa9-45ec-9a40-7fb4fe9b9191">

