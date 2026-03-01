import axios from "axios";

let accessToken: string | null = null;
let refreshToken: string | null = null;


export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});


// Request interceptor to add auth token
apiClient.interceptors.request.use(
    async (config) => {
        let token = accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Response interceptor to handle refresh token

apiClient.interceptors.response.use(
    (response) => {
        // Note: Usually tokens are updated via setSession in the AuthProvider
        // but we can also handle it here if the API returns them in the response.
        return response;
    },
    async (error) => {
        console.log(error);
        const originalRequest = error.config;

        // Check if error.response exists before accessing status
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                let rToken = refreshToken;
                let cookieString = '';

              

                if (!rToken && typeof window === 'undefined') {
                    throw new Error("No refresh token available");
                }

                // Use a separate axios instance or a direct call to avoid interceptor loop if needed
                const response = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh-token`,
                    { refreshToken: rToken },
                    {
                        withCredentials: true,
                        headers: typeof window === 'undefined' ? { Cookie: cookieString } : {}
                    }
                );

                const { access_token, refresh_token } = response.data;

                // Update local tokens

                // We still need a way to tell the AuthProvider to update its state.
                // This is usually done via a callback or by having AuthProvider listen to events.
                // For now, let's just update the header and retry.

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);



