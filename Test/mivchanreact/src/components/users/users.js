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
      }, 0) %
        10 ===
      0
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
      {/* <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
          <div>
            <div className="header">
              <div className="tab">
                <button className="tab-button" onClick={toggleDropdown}>
                  {users[selectedIndex].firstName +
                    " " +
                    users[selectedIndex].lastName}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {users.map((user, index) => (
                      <button
                        className="dropdown-item"
                        key={index}
                        onClick={() => handleClick(index)}
                      >
                        {user.firstName + " " + user.lastName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="back-button">חזרה לאזור אישי</button>
            </div>
            <div className="user-form">
              <div className="item">
                <label htmlFor="firstName">שם פרטי*</label>
                <input
                  type="text"
                  id="firstName"
                  value={users[selectedIndex].firstName}
                  required
                />
                <small id="firstNameHelp" className="text-muted">
                  נא הכנס שם פרטי תקין
                </small>
              </div>
              <div className="item">
                <label htmlFor="lastName">שם משפחה*</label>
                <input
                  type="text"
                  id="lastName"
                  value={users[selectedIndex].lastName}
                  required
                />
                <small id="lastNameHelp" className="text-muted">
                  נא הכנס שם משפחה תקין
                </small>
              </div>
              <div className="item">
                <label htmlFor="id">תעודת זהות</label>
                <input type="text" id="id" value={users[selectedIndex].id} />
                <small id="idSpan" className="idSpan">
                  מספר תעודת זהות לא ניתנת לשינוי
                </small>
              </div>

              <div className="item">
                <label htmlFor="phone">טלפון נייח**</label>
                <div class="phone-input">
                  <div>
                    <select>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                    </select>
                  </div>
                  <div className="home-phone">
                    <input
                      className="inp"
                      type="text"
                      id="phone"
                      value={users[selectedIndex].phone}
                      required
                    />
                  </div>
                </div>
                <small id="phoneHelp" className="text-muted">
                  נא הכנס טלפון תקין
                </small>
              </div>

              <div className="item">
                <label htmlFor="mobile">טלפון נייד**</label>
                <input
                  type="text"
                  id="mobile"
                  value={users[selectedIndex].mobile}
                  required
                />
                <small id="mobileHelp" className="text-muted">
                  נא הכנס נייד תקין
                </small>
              </div>
              <div className="item">
                <label htmlFor="mail">דוא"ל</label>
                <input
                  type="email"
                  id="mail"
                  value={users[selectedIndex].mail}
                />
                <small id="mailHelp" className="text-muted">
                  נא הכנס מייל תקין
                </small>
              </div>
              <div className="bottom-form">
                <div className="requiredInput">
                  <span>*שדות חובה </span>
                  <span>**יש למלא טלפון אחד לפחות</span>
                </div>
                <button className="back-button">שלב הבא</button>
              </div>
            </div>
          </div>
          </div>
          <div class="carousel-item">
          <div className="user-form form-details">
            <div className="item">
              <label htmlFor="city">עיר מגורים</label>
              <input type="text" id="city" value={users[selectedIndex].city} />
            </div>
            <div className="item">
              <label htmlFor="address">כתובת</label>
              <input
                type="text"
                id="address"
                value={users[selectedIndex].address}
              />
            </div>
            <div className="bottom-form">
              <span>*שדות חובה </span>
              <div>
                <button onclick="hideNextForm()">חזור</button>
                <button className="back-button">שלב הבא</button>
              </div>
            </div>
          </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div> */}
      {users.length > 0 && (
        <div className="form-main">
          <div>
            <div className="header">
              <div className="tab">
                <button className="tab-title" onClick={toggleDropdown}>
                  <span class="dropdown-icon">▾</span>
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
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div className="item">
                <label htmlFor="firstName">שם פרטי*</label>
                <input
                  type="text"
                  id="firstName"
                  value={users[selectedIndex].firstName}
                  required
                  onChange={(e) => handleChange(e, "firstName")}
                />
                <small id="firstNameHelp" className="text-muted">
                  נא הכנס שם פרטי תקין
                </small>
              </div>
              <div className="item">
                <label htmlFor="lastName">שם משפחה*</label>
                <input
                  type="text"
                  id="lastName"
                  value={users[selectedIndex].lastName}
                  required
                />
                <small id="lastNameHelp" className="text-muted">
                  נא הכנס שם משפחה תקין
                </small>
              </div>
              <div className="item">
                <label htmlFor="id">תעודת זהות</label>
                <input type="text" id="id" value={users[selectedIndex].id} />
                <small id="idSpan" className="idSpan">
                  מספר תעודת זהות לא ניתנת לשינוי
                </small>
              </div>

              <div className="item">
                <label htmlFor="phone">טלפון נייח**</label>
                <div class="phone-input">
                  <div>
                    <select>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                    </select>
                  </div>
                  <div className="home-phone">
                    <input
                      className="inp"
                      type="text"
                      id="phone"
                      value={users[selectedIndex].phone}
                      required
                    />
                  </div>
                </div>
                <small id="phoneHelp" className="text-muted">
                  נא הכנס טלפון תקין
                </small>
              </div>

              <div className="item">
                <label htmlFor="mobile">טלפון נייד**</label>
                <input
                  type="text"
                  id="mobile"
                  value={users[selectedIndex].mobile}
                  required
                />
                <small id="mobileHelp" className="text-muted">
                  נא הכנס נייד תקין
                </small>
              </div>
              <div className="item">
                <label htmlFor="mail">דוא"ל</label>
                <input
                  type="email"
                  id="mail"
                  value={users[selectedIndex].mail}
                />
                <small id="mailHelp" className="text-muted">
                  נא הכנס מייל תקין
                </small>
              </div>
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
          <div className="user-form form-details">
            <div className="item">
              <label htmlFor="city">עיר מגורים</label>
              <input type="text" id="city" value={users[selectedIndex].city} />
            </div>
            <div className="item">
              <label htmlFor="address">כתובת</label>
              <input
                type="text"
                id="address"
                value={users[selectedIndex].address}
              />
            </div>
            <div className="bottom-form">
              <span>*שדות חובה </span>
              <div>
                <button onclick="hideNextForm()">חזור</button>
                <button className="back-button">שלב הבא</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
