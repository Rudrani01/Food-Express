# Food Express 🍔

Browse restaurants, explore menus, and manage your cart with ease.

**Live Demo:** [https://food-express-plum-beta.vercel.app/](https://food-express-azure.vercel.app/)

## About The Project

Food Express is a React-Redux web application for browsing restaurants and managing orders. Search restaurants, filter by ratings, explore menus by category, and manage your cart—all built with modern React patterns and Redux Toolkit.

Originally used Swiggy's API for realistic data, but their menu endpoint wasn't accessible, so I built a custom mock API to keep things running smoothly.

## Key Features

- **Case-insensitive search** with React state management
- **Dynamic filtering** for 4★+ restaurants
- **Redux Toolkit** for centralized cart state management
- **Accordion menu** with controlled components
- **Custom hooks** for reusable logic
- **Lazy loading** with React.lazy() and Suspense
- **Online/offline detection** using useEffect
- **Shimmer UI** for elegant loading states

## Tech Stack

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Context API
- Jest & React Testing Library

## Implementation Highlights

- Higher-Order Components (HOCs)
- Code splitting for optimized performance
- State lifting and component composition
- Custom mock API for menu data

---

## Development Notes

# Redux Toolkit
- Install @reduxjs/toolkit and react redux
- Build our store
- Connect our store to our App
- Slice (cartSlice)
- dispatch(action)
- Selector 

# Types of testing (developer)
- Unit Testing
- Integration Testing
- End to End Testing - e2e Testing 

# Setting up Testing in our app
- Install React Testing library
- Installed jest
- Installed Babel dependencies
- Configure Babel
- Configure Parcel Config file to disable default transpilation
- Jest configuration = npx create -jest@latest
- Install jsdom library = npm install --save-dev jest-environment-jsdom
- Install @babel/preset-react - to make JSX work in test cases
- Include  @babel/preset-react  inside the library
- npm i -D @testing-library/jest-dom
_ _ = dunder test

# Unit testing
- Contact Us
- Header
- Restaurant
- sum

# will run test cases and won't stop it --> no need to run test again and again (npm test)

# Add to package.json
 - "watch-test": "jest --watch"
 - npm run watch-test



