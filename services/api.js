// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5003/api'; // Replace with your backend URL

const getCalendarEntries = async (token) => {
  try {
    console.log('Using token:', token);
    const response = await axios.get(`${API_URL}/calendar-entries`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching calendar entries:', error.response);
    throw error;
  }
};

// Repeat for other functions


const createCalendarEntry = (entry, token) => {
  return axios.post(`${API_URL}/calendar-entries`, entry, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const updateCalendarEntry = (id, entry, token) => {
  return axios.put(`${API_URL}/calendar-entries/${id}`, entry, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const deleteCalendarEntry = (id, token) => {
  return axios.delete(`${API_URL}/calendar-entries/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const searchItems = async (query, token) => {
  const response = await fetch(`http://localhost:5003/api/search?query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  // Add __typename to each item
  const attractions = data.attractions.map(item => ({ ...item, __typename: 'Attraction' }));
  const events = data.events.map(item => ({ ...item, __typename: 'Event' }));
  const restaurants = data.restaurants.map(item => ({ ...item, __typename: 'Restaurant' }));

  return {
    attractions,
    events,
    restaurants,
  };
};


export {
  getCalendarEntries,
  createCalendarEntry,
  updateCalendarEntry,
  deleteCalendarEntry,
  searchItems,
};
