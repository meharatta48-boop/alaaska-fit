const BASE_URL = 'http://localhost:5000/api';

let accessTokenMemory = '';

export const setAccessToken = (token) => {
  accessTokenMemory = token;
};

export const getAccessToken = () => {
  return accessTokenMemory;
};

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Inject Bearer token if available
  if (accessTokenMemory) {
    headers['Authorization'] = `Bearer ${accessTokenMemory}`;
  }

  const config = {
    ...options,
    headers,
  };

  // Support credentials (cookies) for refresh token
  config.credentials = 'include';

  try {
    let response = await fetch(url, config);

    // Handle token refresh on 401
    if (response.status === 401) {
      console.log('Access token expired or unauthorized. Trying token refresh...');
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setAccessToken(refreshData.accessToken);
        
        // Retry original request with new token
        headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
        response = await fetch(url, config);
      } else {
        // Refresh token expired/failed, delete memory & cookies
        console.warn('Refresh token failed. User must log in again.');
        setAccessToken('');
        window.dispatchEvent(new CustomEvent('auth-failure'));
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
};
