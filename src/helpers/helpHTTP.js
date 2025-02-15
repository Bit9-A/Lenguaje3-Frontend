// filepath: /c:/Users/Dark/Documents/GitHub/Lenguaje3/src/helpers/helpHTTP.js
export const helpHttp = () => {

    const handleErrors = (response) => {
      if (!response.ok) {
        return Promise.reject({
          err: true,
          status: response.status || '00',
          statusText: response.statusText || 'Hay un Error',
        });
      }
      return response;
    };
  
    const customFetch = async (endpoint, options) => {
      const defaultHeaders = {
        'Content-Type': 'application/json',
      };
  
      const token = localStorage.getItem('token');
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }
  
      const controller = new AbortController();
      options.signal = controller.signal;
      options.method = options.method || 'GET';
      options.headers = options.headers ? { ...defaultHeaders, ...options.headers } : defaultHeaders;
  
      if (options.body) {
        options.body = JSON.stringify(options.body);
      }
  
      console.log(options);
  
      const timeout = options.timeout || 5000;
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      try {
        const response = await fetch(endpoint, options);
        clearTimeout(timeoutId);
        const handledResponse = await handleErrors(response);
        if (options.responseType === 'blob') {
          return handledResponse.blob();
        }
        return handledResponse.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          return { err: true, status: '408', statusText: 'Request timed out' };
        }
        return err;
      }
    };
  
    const request = (method) => (url, options = {}) => {
      options.method = method;
      return customFetch(url, options);
    };
  
    return {
      get: request('GET'),
      post: request('POST'),
      put: request('PUT'),
      del: request('DELETE'),
    };
  };