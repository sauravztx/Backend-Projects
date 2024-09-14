
```markdown
# Text Post Web App

A fully functional text post web application that allows users to register, log in, create posts, edit them, like posts, and upload profile pictures. Built with Node.js, Express, EJS, and MongoDB, this application showcases the implementation of authentication, authorization, and basic CRUD operations.

## Features

- **User Authentication**: Secure registration and login using JWT and bcrypt for password hashing.
- **User Profiles**: Each user has a profile where they can see their posts and upload a profile picture.
- **Post Management**: Users can create, edit, and delete their text posts.
- **Like System**: Users can like or unlike posts.
- **Profile Picture Upload**: Users can upload and update their profile pictures.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) and bcrypt
- **Frontend**: EJS for templating
- **File Uploads**: Multer for handling profile picture uploads

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/text-post-web-app.git
   cd text-post-web-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Usage

### Register and Login

- Navigate to `/register` to create a new account.
- After registration, you can log in through `/login`.

### Creating Posts

- Once logged in, navigate to your profile to create a new post.
- You can view, edit, and delete your posts from your profile page.

### Liking Posts

- Posts can be liked or unliked by clicking the like button on the post.

### Profile Picture Upload

- Navigate to `/profile/upload` to upload a profile picture.

## Project Structure

```
|-- models
|   |-- user.js            # User model
|   |-- post.js            # Post model
|-- public                 # Static files (CSS, JS, images)
|-- views                  # EJS templates
|   |-- home.ejs
|   |-- login.ejs
|   |-- index.ejs
|   |-- profile.ejs
|   |-- edit.ejs
|   |-- profileupload.ejs
|-- config
|   |-- multerconfig.js    # Configuration for multer (file uploads)
|-- app.js                 # Main application file
```

## Future Improvements

- Add comment functionality on posts.
- Implement password reset functionality.
- Add pagination for posts on the homepage.
- Enhance frontend UI/UX with a modern framework like React.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

