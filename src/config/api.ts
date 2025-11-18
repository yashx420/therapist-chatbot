// API Configuration
// Update this URL when you deploy your backend to Render
export const API_CONFIG = {
  BACKEND_URL: "https://sentinel-ai-6czp.onrender.com",
};

// Chat API endpoints
export const chatAPI = {
  sendMessage: async (message: string, history: string[]) => {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to connect to the server");
    }

    return response.json();
  },
};
