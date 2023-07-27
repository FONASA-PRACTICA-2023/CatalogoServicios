import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [response, setResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);

  // Function to fetch data using the access token
  const getData = async () => {
    if (!accessToken) return;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var graphql = JSON.stringify({
      query: "",
      variables: {}
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://accounts.claveunica.gob.cl/openid/userinfo", requestOptions);
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log('error', error);
    }
  }

  // Function to get tokens from the URL parameters
  const getTokens = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // ...

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      // ...
    };

    fetch("https://accounts.claveunica.gob.cl/openid/token/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setAccessToken(result.access_token);

        // Save the access token to localStorage
        localStorage.setItem("access_token", result.access_token);
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    // Check if there's a stored access token in localStorage
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    } else {
      // If there's no stored token, get tokens from URL parameters
      getTokens();
    }
  }, []);

  useEffect(() => {
    // Whenever the access token changes, call getData
    if (accessToken) {
      getData();
    }
  }, [accessToken]);

  return (
    <div className="container w-50 mt-4">
      {/* Render your data here */}
      {/* For example, you can display user information */}
      {data && (
        <div>
          <h2>User Information</h2>
          <p>Name: {data.name}</p>
          {/* Add other user data fields */}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
