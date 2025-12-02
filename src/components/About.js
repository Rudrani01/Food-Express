import UserClass from "./UserClass";
import User from "./User";
import { Component } from "react";
import UserContext from "../utils/UserContext";

// class About extends React.Component ---OR
// class based component
class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                about: "Loading...",
                features: [],
                techStack: []
            }
        };

        console.log("Parent Constructor")
    }

    async componentDidMount() {
        console.log("Parent Component Did Mount");

        // Fetch data from GitHub mock API
        const data = await fetch("https://raw.githubusercontent.com/Rudrani01/React/refs/heads/main/mock-data/userData.json");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        console.log("Fetched user data:", json);
    }

    render() {
        console.log("Parent Render");

        const { about, features, techStack } = this.state.userInfo;

        return (
            // Main page container with soft background
            <div className="bg-gray-50 min-h-screen px-4 py-6 sm:pt-6 sm:py-10">
                {/* Page Heading */}
                <h1 className="font-bold text-3xl sm:text-4xl text-gray-800 mb-10 text-center">
                    <div className="mb-4"></div>
                    About FOOD EXPRESS
                </h1>

                {/* Logged-in user info */}
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-10 mb-6  border-8 border-yellow-100">
                    <div className="mb-4">
                        <span className="font-semibold text-gray-700">Logged-in User:</span>
                        <UserContext.Consumer>
                            {(data) => <span className="ml-2 text-gray-900 font-medium">{data.loggedInUser}</span>}
                        </UserContext.Consumer>
                    </div>

                    {/* <h2>This is  React Series</h2> */}

                    {/* Commented out to avoid duplicate data */}
                    {/* <UserClass name={"First"} location={"Dehradun class"} /> */}
                    {/* <UserClass name={"Second"} location={" US "} /> */}

                    {/* Display data from GitHub API - shown only once */}
                    <div className="text-center px-4">
                        <h3 className="font-semibold text-xl sm:text-lg mb-2 text-gray-800">FOOD EXPRESS:</h3>
                        <p className="mb-6 text-gray-700 text-left sm:text-center leading-relaxed">{about}</p>

                        {/* Features and Tech Stack - responsive layout */}
                        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start gap-10">
                            {/* Features */}
                            <div className="flex flex-col items-center sm:items-start">
                                <h4 className="font-semibold text-gray-800 mb-2 text-center sm:text-left">Features:</h4>
                                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
                                    {features &&
                                        features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-col items-center sm:items-start">
                                <h4 className="font-semibold text-gray-800 mb-2 text-center sm:text-left">Tech Stack:</h4>
                                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-left">
                                    {techStack &&
                                        techStack.map((tech, index) => (
                                            <li key={index}>{tech}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// this is the same thing as above
// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <h2>This is Namaste React Web Series</h2>
//             <UserClass name={"Rudrani Dhomne (classs)"} location={"Dehradun class"} />

//             {/* <User name={"Rudrani Dhomne (function)"} /> */}

//         </div>
//     );
// };

export default About;
