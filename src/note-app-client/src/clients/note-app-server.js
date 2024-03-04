import axios from 'axios';

const API_URL = 'http://localhost:4000/api/notes';
const SHARED_SECRET = process.env.REACT_APP_SHARED_SECRET;

export const getAllNotes = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'X-Auth-Token': token,
        'X-Shared-Secret': SHARED_SECRET
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNoteById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'X-Auth-Token': token,
        'X-Shared-Secret': SHARED_SECRET
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error;
  }
};

export const postNote = async (noteData, token) => {
    try {
      noteData.deadline = noteData.deadline === null || noteData.deadline === ''
        ? noteData.deadline
        : formatDate(noteData.deadline);
      const response = await axios.post(API_URL, noteData, {
            headers: {
                'X-Auth-Token': token,
                'X-Shared-Secret': SHARED_SECRET
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting note:', error);
        throw error;
    }
};

function formatDate(date) {
  const pad = (num) => (num < 10 ? '0' + num : num);

  const myDate = new Date(date);
  const utcDate = new Date(myDate.getTime() + myDate.getTimezoneOffset() * 60000);

  const year = utcDate.getFullYear();
  const month = pad(utcDate.getMonth() + 1); // Months are 0-based
  const day = pad(utcDate.getDate());

  const hours = pad(utcDate.getHours());
  const minutes = pad(utcDate.getMinutes());
  const seconds = pad(utcDate.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const updateNoteById = async (id, noteData, token) => {
    try {
      noteData.deadline = noteData.deadline === null || noteData.deadline === ''
        ? noteData.deadline
        : formatDate(noteData.deadline);
      const response = await axios.put(`${API_URL}/${id}`, noteData, {
        headers: {
          'X-Auth-Token': token,
          'X-Shared-Secret': SHARED_SECRET
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating note with ID ${id}:`, error);
      throw error;
    }
  };

export const updateNoteStatusById = async (id, status, token) => {
    try {
      const response = await axios.patch(`${API_URL}/status/${id}`, { status }, {
        headers: {
          'X-Auth-Token': token,
          'X-Shared-Secret': SHARED_SECRET
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for note with ID ${id}:`, error);
      throw error;
    }
  };

export const updateNoteArchiveById = async (id, isArchived, token) => {
  try {
    const response = await axios.patch(`${API_URL}/archive/${id}`, { isArchived }, {
      headers: {
        'X-Auth-Token': token,
        'X-Shared-Secret': SHARED_SECRET
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating isArchived for note with ID ${id}:`, error);
    throw error;
  }
};

export const deleteNoteById = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'X-Auth-Token': token,
                'X-Shared-Secret': SHARED_SECRET
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting note with ID ${id}:`, error);
        throw error;
    }
};