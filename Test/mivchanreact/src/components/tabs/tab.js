import React from "react";
import './users.css'

const Tabs = (props) => {

    const { users, selectedIndex, setSelectedIndex } = props;

    return (
        <div>
            <div className="tabs">
                <div className="tab">
                    <button className="tab-button">{users[selectedIndex].firstName + ' ' + users[selectedIndex].lastName}</button>
                    <div className="dropdown-content dropdown-menu">
                        {users.map((user, index) => (
                            <button className="dropdown-item" key={index} onclick={setSelectedIndex(index)}>{user.firstName + ' ' + user.lastName}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div >
    )
}

export default Tabs;