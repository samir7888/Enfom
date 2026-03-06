import axios from "axios";

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string | null, refresh: string | null) => {
    accessToken = access;
    refreshToken = refresh;
};


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
                const rToken = refreshToken || (typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null);

                if (!rToken) {
                    throw new Error("No refresh token available");
                }

                const cookieString = '';

                // Use a separate axios instance or a direct call to avoid interceptor loop if needed
                const response = await axios.post(`${apiClient.defaults.baseURL}/Auth/refresh-token`,
                    { expiryToken: rToken },
                    {
                        withCredentials: true,
                        headers: typeof window === 'undefined' ? { Cookie: cookieString } : {}
                    }
                );

                const { access_token, refresh_token } = response.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                // Update local tokens so the request interceptor uses the new one
                setTokens(access_token, refresh_token);

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);



