import React, { useState } from "react";
import "./users.css";

const UserList = (props) => {
  const { users, setUsers } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = (index) => {
    setSelectedIndex(index);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isValidIsraeliID = (id) => {
    const idStr = String(id).trim();
    if (idStr.length !== 9 || isNaN(idStr)) return false;

    return (
      [...idStr].reduce((sum, digit, i) => {
        const step = Number(digit) * ((i % 2) + 1);
        return sum + (step > 9 ? step - 9 : step);
      }, 0) % 10 === 0
    );
  };

  const validateForm = () => {
    const user = users[selectedIndex];

    if (!user.firstName || !user.lastName || (!user.phone && !user.mobile)) {
      setErrorMessage("נא למלא את כל שדות החובה ולפחות מספר טלפון אחד.");
      return false;
    }
    if (!isValidIsraeliID(user.id)) {
      setErrorMessage("תעודת הזהות שהוזנה אינה תקינה.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      console.log("Form is valid");
    }
  };

  const handleChange = (e, property) => {
    const updatedUsers = [...users];
    updatedUsers[selectedIndex][property] = e.target.value;
    setUsers(updatedUsers);
  };

  const currentUser = users[selectedIndex];

  return (
    <div className="form-container">
      {users.length > 0 && (
        <div className="form-main">
          <div>
            <div className="header">
              <div className="tab">
                <button className="tab-title" onClick={toggleDropdown}>
                  <span className="dropdown-icon">▾</span>
                  {`${currentUser.firstName} ${currentUser.lastName}`}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {users.map((user, index) => (
                      <button
                        className="dropdown-item"
                        key={index}
                        onClick={() => handleClick(index)}
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="back-button">חזרה לאזור אישי</button>
            </div>

            <div className="user-form">
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {["firstName", "lastName", "phone", "mobile", "mail"].map((field) => (
                <div className="item" key={field}>
                  <label htmlFor={field}>{field === "firstName" ? "שם פרטי*" : field === "lastName" ? "שם משפחה*" : field === "phone" ? "טלפון נייח**" : field === "mobile" ? "טלפון נייד**" : "דוא"ל"}</label>
                  <input
                    type="text"
                    id={field}
                    value={currentUser[field]}
                    required={field === "firstName" || field === "lastName" || field === "phone" || field === "mobile"}
                    onChange={(e) => handleChange(e, field)}
                  />
                  <small id={`${field}Help`} className="text-muted">
                    {field === "firstName" || field === "lastName"
                      ? `נא הכנס ${field === "firstName" ? "שם פרטי" : "שם משפחה"} תקין`
                      : field === "phone" || field === "mobile"
                      ? "נא הכנס טלפון תקין"
                      : "נא הכנס מייל תקין"}
                  </small>
                </div>
              ))}
              <div className="bottom-form">
                <div className="requiredInput">
                  <span>*שדות חובה </span>
                  <span>**יש למלא טלפון אחד לפחות</span>
                </div>
                <button className="back-button" onClick={handleNextClick}>
                  שלב הבא
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
