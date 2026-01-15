export const API_BASE_URL = 'http://localhost:3001/api';

export const PORTS = {
  BACKEND: 3001,
  FRONTEND: 3000,
};

export const TIME_ENTRY = {
  MIN_HOURS: 0.25,
  MAX_HOURS: 24,
  DEFAULT_HOURS: 1,
  TEXTAREA_ROWS: 4,
  SUCCESS_MESSAGE_DURATION: 3000, // ms
};

export const TAILWIND = {
  input: 'w-full px-3 py-2 border border-gray-400 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700',
  button: 'w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors',
  card: 'bg-white rounded-lg shadow-md p-6',
  errorBox: 'mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm',
  successBox: 'mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm',
};
