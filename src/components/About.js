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
        <div>
            <h1 className="text-2xl font-bold text-center m-4 p-4">About</h1>
            <div className="p-2 m-2 font-semibold">
                logged-in-user :
                <UserContext.Consumer>
                    {(data) => <h1>{data.loggedInUser}</h1>}
                </UserContext.Consumer>
            </div>

            {/* <h2>This is  React Series</h2> */}
            
            {/* Commented out to avoid duplicate data */}
            {/* <UserClass name={"First"} location={"Dehradun class"} /> */}
            {/* <UserClass name={"Second"} location={" US "} /> */}

            {/* Display data from GitHub API - shown only once */}
            <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">FOOD EXPRESS:</h3>
                <p className="mb-4">{about}</p>
                
                <h3 className="font-semibold text-lg mb-2">Features:</h3>
                <ul className="mb-4">
                    {features && features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                
                <h3 className="font-semibold text-lg mb-2">Tech Stack:</h3>
                <ul>
                    {techStack && techStack.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
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