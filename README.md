# Goal Crushers - A Web App for Tracking Goals and Habits

Goal Crushers is a full-stack web application designed to help individuals track their goals and habits effortlessly. The user interface is designed with a low perceptual load to ensure ease of use and reduce cognitive strain, which is shown to be helpful to members of the neurodivergent community.

## Features

- Create and manage personal goals and habits.
- Keep goals private or allow public views.
- Track progress through an intuitive and clutter-free user interface.
- Quickly analyze data visually with our easy to read calendar.
- Responsive design for seamless use across different devices.
- Ability to add reactions and comment on public goals of other users.
- Feed gives a quick view of the activity of users with automatic status updates, including new users, new public goals, progress updates, and comments.

Coming soon:

- Personalize the app's appearance according to individual preferences.
- Pomodoro timer to help with finding balance betwen focus and healthy breaks.
- Set reminders and notifications to stay on track.
- Follow other users to offer support and encouragement.
- 'Feed' view based on followed users.

## How It's Made:

**MVC Architecture**

Serial Crusher follows the MVC architecture to ensure a clear separation of concerns and maintainable code:

- Model: Responsible for managing the data and business logic. It interacts with the database to store and retrieve goal, user, comment, and status information.
- View: Handles the presentation and user interface. The views are designed with low perceptual load to support users in the neurodivergent community.
- Controller: Acts as the intermediary between the model and the view. It processes user input, triggers appropriate actions, and updates the view based on the model's data.

**Tech used:**

Backend:

- Node.js: Backend server environment for building scalable web applications.
- Express.js: Web application framework for Node.js, used to handle routing and server-side logic.
- JSON Web Token stored in secure httpOnly cookie for authentication.
- MongoDB: NoSQL database for storing user data securely.
- Mongoose: straight-forward, schema-based solution for modeling application data.
- Cloudinary: Digital Asset Management (DAM) focused on flexibility, intelligent automation, and scale.
- Custom Error Handler: shows error stack when in development mode.

Frontend:

- React: Creat user interfaces out of individual pieces called components for streamlined building.
- React Router: Reduces serve requests with client side routing.
- React Toastify: Alerts and notifications handler for the UI.
- React Redux Toolkit: State management toolset to enable predictable, consistent behavior.
  - RTK Query: Data fetching and caching tool, simplifying common cases for loading data and eliminating the need to hand-write data fetching & caching logic. It is an optional addon included in Redux Toolkit,built on top of the other APIs in Redux Toolkit.
- Tailwind CSS: A utility-first CSS framework with a mobile first approach.
- Vite: leverages the availability of native ES modules in the browser.
- date-fns: Provides a comprehensive, yet simple and consistent toolset for manipulating Javascript dates in the browser and Node.js.

### Prerequisites

- Node.js (required)
- npm install
- Create a .env file in the root directory and set the required environment variables, such as database credentials, API keys, etc.

## Optimizations

**Authentication/Route Protection**

- Changed from original authentication/session strategy to JSON Web Token within Secure httpOnly cookie to reduce storage needs.
- Cookie is stored in the browser instead of session information being stored in the DB.
- Upon logout, the cookie is destroyed.
- Authentication middleware ensures that the routes are protected.

**Tailwind CSS**

- Changed from React Bootstrap to Tailwind CSS for more customization options. Used in conjunction with Vanilla CSS to achieve the desired look of the UI. Bootstrap was too opinionated for the desired look and functionality.

**date-fns**

- Added to frontend stack to help with creating timestamp-based components, such as TimeAgo. Formatting with date-fns helped make code cleaner and more readable when created the calendar component as well.

## Lessons Learned/Reinforced:

**State Management vs Data Fetching/Caching**

- "Data fetching and caching" is really a different set of concerns than "state management"
- RTK Query and Mutations added to reduce the need to write boilerplate code for fetching and caching
  - createApi(): defines a set of endpoints that describe how to retrieve data from a series of endpoints
  - fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests.
  - tags: created to manage cached data, allow for forced updates through invalidation
