// Stub API file - No backend connection
// All backend functionality has been removed

export const setAuthToken = (token) => {
  console.log('Auth token functionality disabled');
};

export const getAuthToken = () => {
  return null;
};

// Placeholder functions
export const login = async () => {
  throw new Error('Backend connection disabled');
};

export const register = async () => {
  throw new Error('Backend connection disabled');
};

export const logout = () => {
  console.log('Logout functionality disabled');
};
