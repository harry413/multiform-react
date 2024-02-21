import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    zip: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First Name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      }
    } else if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.zip.trim()) {
        newErrors.zip = 'ZIP Code is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h2>Step 1: Personal Information</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="step">
            <h2>Step 2: Address Information</h2>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <span className="error">{errors.address}</span>}
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            {errors.city && <span className="error">{errors.city}</span>}
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="ZIP Code"
            />
            {errors.zip && <span className="error">{errors.zip}</span>}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div className="step">
            <h2>Step 3: Confirm Information</h2>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Email: {formData.email}</p>
            <p>Address: {formData.address}</p>
            <p>City: {formData.city}</p>
            <p>ZIP Code: {formData.zip}</p>
            <button onClick={prevStep}>Previous</button>
            <button type="submit">Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
}

export default App;
