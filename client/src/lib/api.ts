import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
  }) => api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (profileData: {
    name?: string;
    phone?: string;
    avatar?: string;
  }) => api.put('/auth/profile', profileData),
};

// Therapists API
export const therapistsAPI = {
  getTherapists: (params?: {
    specialization?: string;
    minRate?: number;
    maxRate?: number;
    sessionType?: string;
    language?: string;
    page?: number;
    limit?: number;
  }) => api.get('/therapists', { params }),
  
  getTherapistById: (id: string) => api.get(`/therapists/${id}`),
  
  createProfile: (profileData: {
    specializations: string[];
    bio: string;
    experience: number;
    education: string[];
    certifications?: string[];
    languages: string[];
    sessionTypes: string[];
    hourlyRate: number;
    availability: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
  }) => api.post('/therapists/profile', profileData),
  
  getMyProfile: () => api.get('/therapists/my-profile'),
  
  updateProfile: (profileData: any) => api.put('/therapists/profile', profileData),
};

// Sessions API
export const sessionsAPI = {
  createSession: (sessionData: {
    therapistId: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    sessionType: string;
    isOnline?: boolean;
    clientNotes?: string;
  }) => api.post('/sessions', sessionData),
  
  getSessions: (params?: {
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }) => api.get('/sessions', { params }),
  
  getSessionById: (id: string) => api.get(`/sessions/${id}`),
  
  updateSession: (id: string, updateData: {
    status?: string;
    therapistNotes?: string;
    clientNotes?: string;
    meetingLink?: string;
  }) => api.put(`/sessions/${id}`, updateData),
  
  cancelSession: (id: string) => api.patch(`/sessions/${id}/cancel`),
};

export default api;
