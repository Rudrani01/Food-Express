import React from "react";

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     count: 0,
        //     count2: 2,
        // };

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
            },
        };
        console.log(this.props.name + "Child Constructor");
    }

    async componentDidMount() {
        console.log(this.props.name + "Child Component Did Mount");

        // API Call
        const data = await fetch("https://raw.githubusercontent.com/Rudrani01/React/refs/heads/main/mock-data/userData.json");
        const json = await data.json();

        // Since your JSON has a "user" object, access it like this:
        this.setState({
            userInfo: json.user,
        });

        console.log(json);
    }

    componentDidUpdate() {
        console.log("Component Did Update");
    }

    componentWillUnmount() {
        console.log("Component Will unmount")
    }

    render() {
        // const { name, location } = this.props;
        // const {count} = this.state;

        console.log(this.props.name + "Child Render");


        const { name, location } = this.state.userInfo;

        return (
            <div className="user-card m-4 p-6 bg-gray-100 rounded-lg shadow-md">
                {/* <h1>Count: {count} </h1>
                <button onClick={() => {
                    // Never directly update your state variable
                    this.setState({
                        count: this.state.count + 1,
                        count2: this.state.count2 + 1,

                    })
                }}
                >
                    Count Increase
                </button> */}
                <h2 className="font-bold text-xl">Name: {name} </h2>
                <h3 className="text-gray-700">Location: {location} </h3>
                <h4 className="text-gray-600">Contact: @rudrani</h4>
            </div>
        );
    }
}

export default UserClass;


/* 
    Parent Constructor
    FirstChild Render

    SecondChild Constructor
    SecondChild Render

    <DOM UPDATED - IN STABLE BATH>
    FirstChild Component Did Mount
    SecondChild Component Did Mount

*/