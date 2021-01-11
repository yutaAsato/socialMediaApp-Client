# Social Media Web Application

A POC Social Media Application to share and chat with family and friends. The client is deployed to Netlify and the server + database are hosted on Heroku. The client UI is built using React, asynchronous data and server state is managed using React-Query and the fetch API. UI state is managed with the Context API. The REST API server is built with node.js/express.js which connects to a PostgreSQL database. Responsive design and styles handled with emotions library.

NOTE: Initial load of application may take a few seconds as the backend Heroku web dynos need to awake from sleep.

DEMO CREDENTIALS: Email Address: admin@gmail.com, Password: 123


## Features

 Login/Registration feature to sign up a new user or verify an existing user. Form validation is handled on the server side and authentication is handled using JWT   (JSON Web Tokens) once a user has been verified. Bycrpt is used for password hashing, user data is then stored in a PostgreSQL database.

[![Screen-Shot-2021-01-10-at-16-24-18.png](https://i.postimg.cc/x1XxVW5N/Screen-Shot-2021-01-10-at-16-24-18.png)](https://postimg.cc/QFrkpYRj)

 The home dashboard lets users see a list of posts in chronological order from users they follow. Users can 'like' or 'comment' on other user's post. The 'who to follow' section gives suggestions of other users to follow, this list is randomized on each rerender. The icon on the right side allows the user to click and follow or unfollow that user. The searchbox allows the user to search for a specific user, the search component has a matching feature where it will filter the list in real-time as the user inputs a search. It will show a drop down list of users who are in the database.
 
 [![Screen-Shot-2021-01-10-at-18-04-34.png](https://i.postimg.cc/yYSB3Fdk/Screen-Shot-2021-01-10-at-18-04-34.png)](https://postimg.cc/7fDjpJSk)
 
 The 'profile' page shows information of a particular user including a bio, location and the number of followers and following. A list of all the users posts are also shown in chronological order. The 'edit detail' button will show if the current profile is the logged user's profile, this opens a modal when clicked and allows the user to edit the details and to upload or edit a profile picture.
 
 [![Screen-Shot-2021-01-10-at-18-15-02.png](https://i.postimg.cc/fTnsQVzX/Screen-Shot-2021-01-10-at-18-15-02.png)](https://postimg.cc/PN49mr8r)
 
 The user will be routed to the 'post details' page when any post is clicked. This displays the post with like and comment counts as well as a list of all the comments from other users attached to the post. The right side section will change to a 'relevant user' component which allows the user to easily follow or unfollow the user currently being displayed.
 
 [![Screen-Shot-2021-01-10-at-18-23-11.png](https://i.postimg.cc/mgdXynhj/Screen-Shot-2021-01-10-at-18-23-11.png)](https://postimg.cc/0zw08cYK)
 
 The user will receive a notification badge when another user has liked, commented or followed the user or user's posts. When clicked a modal notifications list is displayed and the user can navigate to relevant notification url when clicked.
 
 [![Screen-Shot-2021-01-10-at-18-33-16.png](https://i.postimg.cc/B6hVQQ1x/Screen-Shot-2021-01-10-at-18-33-16.png)](https://postimg.cc/LY1TxSDX)
 [![Screen-Shot-2021-01-10-at-18-33-31.png](https://i.postimg.cc/Y2vHGJqp/Screen-Shot-2021-01-10-at-18-33-31.png)](https://postimg.cc/6TxSFbvS)
 
 The 'post' feature allows the user to make a post. There is a post button on the home dashboard which opens a modal box, users are also able to type and make a post at the top of the home dashboard section.
 
 [![Screen-Shot-2021-01-10-at-18-38-45.png](https://i.postimg.cc/3whGWXXT/Screen-Shot-2021-01-10-at-18-38-45.png)](https://postimg.cc/87yc0rXK)
 
 Responsive design. Bottom navigation bar when in mobile.
 
 [![Screen-Shot-2021-01-11-at-12-34-03.png](https://i.postimg.cc/QCgg5WRR/Screen-Shot-2021-01-11-at-12-34-03.png)](https://postimg.cc/XBJy6XN8)
 [![Screen-Shot-2021-01-11-at-12-34-19.png](https://i.postimg.cc/Y2NQdYsP/Screen-Shot-2021-01-11-at-12-34-19.png)](https://postimg.cc/Wt3D3Fjm)
 [![Screen-Shot-2021-01-11-at-12-35-03.png](https://i.postimg.cc/028DFrgy/Screen-Shot-2021-01-11-at-12-35-03.png)](https://postimg.cc/14j8Nm5k)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
