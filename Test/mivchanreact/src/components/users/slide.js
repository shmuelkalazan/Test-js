import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNextClick = () => setCurrentStep(currentStep + 1);
  const handleBackClick = () => setCurrentStep(currentStep - 1);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Sample data for users
  const users = [
    {
      firstName: 'שם',
      lastName: 'משפחה',
      id: '123456789',
      phone: '',
      mobile: '',
      mail: '',
      city: '',
      address: '',
    },
  ];

  return (
    <div className="form-container">
      {currentStep === 1 ? (
        <div className="user-form slide-in">
          {/* Form 1 content */}
          {/* Header and form fields here */}
          <button className="back-button" onClick={handleNextClick}>
            שלב הבא
          </button>
        </div>
      ) : (
        <div className="user-form form-details slide-in">
          {/* Form 2 content */}
          {/* Fields like city, address, etc. */}
          <button onClick={handleBackClick}>חזור</button>
          <button className="back-button">שלב הבא</button>
        </div>
      )}
    </div>
  );
}

export default App;
