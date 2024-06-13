
import axios from 'axios';
import { BASE_URL } from '../constants/config';

const getCalendarEntries = async (token) => {
  try {
    console.log('Using token:', token);
    const response = await axios.get(`${BASE_URL}/api/calendar-entries`, {
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



const createCalendarEntry = (entry, token) => {
  return axios.post(`${BASE_URL}/api/calendar-entries`, entry, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const updateCalendarEntry = (id, entry, token) => {
  return axios.put(`${BASE_URL}/api/calendar-entries/${id}`, entry, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const deleteCalendarEntry = (id, token) => {
  return axios.delete(`${BASE_URL}/api/calendar-entries/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const searchItems = async (query, token) => {
  const response = await fetch(`${BASE_URL}/api/search?query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

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
