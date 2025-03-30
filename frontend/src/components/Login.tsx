import React, { useState, createContext, useContext } from "react";
import "./Login.css"; // Ensure you have styles for your forms
import { useAuth, AuthProvider, ProfileProps } from "./AuthContext";

const Login: React.FC = () => {
  //const [isSignup, setIsSignup] = useState<boolean>(false); // Toggle between login and signup
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); 
  const { isLoggedIn, login, logout, profile } = useAuth();
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString()


  const [isSignUp, setIsSignUp] = useState(false); // Toggles between login and sign-up
    
  const { setProfile } = useAuth(); // Get setProfile from the context
  const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

    const profileData = {
      name: "Kyle Test",
      photoUrl: "https://static-00.iconduck.com/assets.00/cat-face-emoji-2048x1821-x3kf878r.png",
      username: "kyle123",
      memberSince: "March 29, 2025",
      distanceTravelled: 1500,
      team: "Red"
    };

    const debugLogin = () => {
      login();
      setProfile(profileData);
    }
  
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await login({ userId: formData.username, password: formData.password });
        console.log("Login successful!");
      } catch (err: any) {
        setError(err.message);
        console.error("Login error:", err);
      }
    };
  
    return (
      <div style={formStyle}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
  
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <label style={labelStyle}>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </label>
  
              <label style={labelStyle}>
                Photo URL:
                <input
                  type="text"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </label>
  
              <label style={labelStyle}>
                Team:
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </label>
              
              <label style={labelStyle}>
                Email:
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </label>
            </>
          )}
  
          <label style={labelStyle}>
            Username:
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
  
          <label style={labelStyle}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
  
          <button type="submit" style={buttonStyle}>
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
  
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={toggleButtonStyle}
        >
          Switch to {isSignUp ? "Login" : "Sign Up"}
        </button>


        <h3>DEBUG:</h3>
        <button onClick={debugLogin}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };  

const formStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "10px",
  fontSize: "16px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "14px",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const toggleButtonStyle: React.CSSProperties = {
  marginTop: "10px",
  backgroundColor: "transparent",
  border: "none",
  color: "#007bff",
  cursor: "pointer",
  fontSize: "14px",
  textDecoration: "underline",
};


export default Login;

