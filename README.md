# GoalSense - A Web App for Tracking Goals and Habits

GoalSense is a user-friendly web application designed to help individuals in the neurodivergent community track their goals and habits effortlessly. The user interface is designed with a low perceptual load to ensure ease of use and reduce cognitive strain.

## Features

- Create and manage personal goals and habits.
- Track progress through an intuitive and clutter-free interface.
- Quickly analyze data visually with our easy to read calendar.
- Personalize the app's appearance according to individual preferences.
- Responsive design for seamless use across different devices.

Coming soon:

- Set reminders and notifications to stay on track.

## How It's Made:

**Tech used:**

Backend:

- Node.js with Express
- MVC (Model-View-Controller) Architecture
- JSON Web Token stored in secure httpOnly cookie for authentication
- MongoDB w/ Mongoose
- Cloudinary for image cloud storage
- Custom Error Handler

Frontend:

-

## Optimizations

- Authentication/Route Protection:
  Changed from original authentication/session strategy to JSON Web Token within Secure httpOnly cookie to reduce storage needs. Cookie is stored in the browser instead of session information being stored in the DB. Upon logout, the cookie is destroyed. Authentication middleware ensures that the routes are protected.

## Lessons Learned/Reinforced:
