import React, { useState } from 'react';
import './SurveyForm.css'; // Import CSS file for styling
import image1 from './image1.png';
const SurveyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 'Good',
    additionalField: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error message when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.feedback) {
      errors.feedback = 'Feedback is required';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or perform any further actions
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-image">
        <img src={image1} alt="Registration" />
      </div>
      <div className="registration-form">
        <h2>Survey Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <textarea
              name="feedback"
              placeholder="Feedback"
              value={formData.feedback}
              onChange={handleChange}
            ></textarea>
            {errors.feedback && <span className="error">{errors.feedback}</span>}
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <select name="rating" value={formData.rating} onChange={handleChange}>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="additionalField"
              placeholder="Additional Field"
              value={formData.additionalField}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
