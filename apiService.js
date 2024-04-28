// apiService.js
const API_BASE_URL = "http://localhost:8080"; // Base URL for your API

// Function to create default headers, with optional Bearer token
function createHeaders(token = null, refreshToken = null) {
  const headers = {
    "Content-Type": "application/json", // Default content type
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // Add Bearer token if provided
  } else if (refreshToken) {
    headers["Authorization"] = `Bearer ${refreshToken}`;
  }

  return headers;
}

// Function to handle API errors
function handleApiError(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json(); // Parse response JSON
}

// Function to make a GET request
export function apiGet(endpoint, token = null) {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: createHeaders(token),
  })
    .then(handleApiError) // Handle errors and parse JSON
    .catch((error) => {
      console.error("API GET error:", error);
      throw error; // Re-throw error for further handling if needed
    });
}

// Function to make a POST request
export function apiPost(endpoint, data, token = null, refreshToken = null) {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: createHeaders(token, refreshToken),
    body: JSON.stringify(data), // Stringify JSON data
  })
    .then(handleApiError)
    .catch((error) => {
      console.error("API POST error:", error);
      throw error;
    });
}

export function apiPut(endpoint, data, token = null) {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT", // HTTP PUT method
    headers: createHeaders(token), // Create headers with optional tokens
    body: JSON.stringify(data), // Stringify the data to send
  })
    .then(handleApiError) // Use common error handling
    .catch((error) => {
      console.error("API PUT error:", error);
      throw error; // Re-throw the error for further handling if needed
    });
}

export function apiDelete(endpoint, token = null) {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE", // HTTP DELETE method
    headers: createHeaders(token), // Create headers with optional tokens
  })
    .then(handleApiError) // Use common error handling
    .catch((error) => {
      console.error("API DELETE error:", error);
      throw error; // Re-throw the error for further handling if needed
    });
}

// Export functions for use in other parts of your application
// module.exports = {
//   apiGet,
//   apiPost,
// };
