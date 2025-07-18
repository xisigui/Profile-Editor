# User Profile CRUD Operation API with React JS

This project consists of a **.NET 9.0 Core Web API** backend that allows performing CRUD operations on user profiles. The user profile contains fields like **Name**, **Email Address**, **Gender**, **Birth Date**, and **Age**. The frontend is built with **React.js**, allowing users to interact with the API to modify or create profiles.

## Features

- Add a new user profile to the database.
- Display a table of all existing/registered user profiles.
- Edit an existing user profile.
- Delete a user profile from the database.

## Tech Stack

- **Backend**: .NET 9.0 Web API
  - **Entity Framework Core** for ORM
  - **SQLite** for the database
- **Frontend**: React.js
  - **Axios** for API communication
  - **NextJS** for framework
  - **Zod** for data validation
- **Database**: SQLite

## Prerequisites

Ensure the following tools are installed on your system:

1. **.NET SDK** version 9.0.302:
   - [Download .NET SDK 9.0](https://dotnet.microsoft.com/download)
2. **Node.js** version 22.14.0:
   - [Download Node.js](https://nodejs.org/en/blog/release/v22.14.0)
3. **SQLite**:
   - [Download SQLite](https://www.sqlite.org/download.html)

## Setting Up the Backend (.NET Core Web API)

### 1. Clone the repository:

```bash
git clone https://github.com/xisigui/Profile-Editor.git
cd backend
```
### 2. Install Dependencies *(Optional)*  
>Skip this step if the required dependencies are already installed.
```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### 3.  Create and apply database migrations  *(Optional)*
>The database migration is already automatic you can skip this part)
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

4. **Run the API:**

```bash
dotnet run
```

The API will be available at http://localhost:8000.

## Setting Up the Frontend (React.js)

### 1. Navigate to the frontend folder:

```bash
cd frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Copy the environment example file and configure it: **(Required)**
>Make sure to do this before running the frontend)

```bash
copy .env.example .env
```

### 4. Run the frontend:

```bash
npm start
```

or

```bash
npm run dev
```

The frontend will be available at http://localhost:3000.

## API Endpoints

1. **GET /api/UserProfiles**
   Fetch all user profiles.

Response: A list of user profiles.

2. **GET /api/UserProfiles/{id}**
   Fetch a specific user profile by id.

Response: A single user profile.

3. **POST /api/UserProfiles**
   Create a new user profile.

Request Body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "gender": "Male",
  "birthDate": "1990-01-01T00:00:00Z",
  "age": 30
}
```

4. **PUT /api/UserProfiles/{id}**
   Update an existing user profile by id.

Request Body:

```json
{
  "name": "John Doe Updated",
  "email": "john.doe.updated@example.com",
  "gender": "Male",
  "birthDate": "1990-01-01T00:00:00Z",
  "age": 31
}
```

5. **DELETE /api/UserProfiles/{id}**
   Delete a user profile by id.
