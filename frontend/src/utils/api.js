const BASE_URL = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://alaaska-fit.onrender.com/api')).replace(/\/$/, '');

let accessTokenMemory = '';

export const setAccessToken = (token) => {
  accessTokenMemory = token;
};

export const getAccessToken = () => {
  return accessTokenMemory;
};

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessTokenMemory) {
    headers['Authorization'] = `Bearer ${accessTokenMemory}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include',
  };

  try {
    let response = await fetch(url, config);

    if (response.status === 401) {
      console.log('Access token expired or unauthorized. Trying token refresh...');
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json().catch(() => ({}));
        if (refreshData.accessToken) {
          setAccessToken(refreshData.accessToken);
          headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
          response = await fetch(url, { ...config, headers });
        } else {
          throw new Error('Unable to refresh session');
        }
      } else {
        console.warn('Refresh token failed. User must log in again.');
        setAccessToken('');
        window.dispatchEvent(new CustomEvent('auth-failure'));
      }
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorData = {};
      if (errorText) {
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
      }
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
};
