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