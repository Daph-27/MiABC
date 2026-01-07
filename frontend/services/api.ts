/**
 * API Service for MiABC
 * Handles authentication and API communication with the backend
 */
import * as SecureStore from 'expo-secure-store';

// API Configuration
// For Android emulator use 10.0.2.2, for iOS simulator use localhost
// For physical device, use your computer's local IP address
const API_BASE_URL = 'http://10.0.2.2:8000/api';

// Token storage key
const TOKEN_KEY = 'miabc_auth_token';
const USER_KEY = 'miabc_user';

// Types
export interface User {
    userId: number;
    accessCode: string;
    guardianName: string;
    guardianRelation?: string;
    guardianEmail?: string;
    guardianPhone?: string;
    learnerName: string;
    learnerAge?: number;
    learnerGrade?: string;
    username: string;
    parentalLock?: string;
    profilePhoto?: string;
    createdAt: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    accessCode: string;
    guardianName: string;
    guardianRelation?: string;
    guardianEmail?: string;
    guardianPhone?: string;
    learnerName: string;
    learnerAge?: number;
    learnerGrade?: string;
    username: string;
    password: string;
    parentalLock?: string;
    profilePhoto?: string;
}

// API Error class
export class ApiError extends Error {
    status: number;
    detail: string;

    constructor(status: number, detail: string) {
        super(detail);
        this.status = status;
        this.detail = detail;
    }
}

// Token management
export const tokenService = {
    async getToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        } catch {
            return null;
        }
    },

    async setToken(token: string): Promise<void> {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    },

    async removeToken(): Promise<void> {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    },

    async getUser(): Promise<User | null> {
        try {
            const userJson = await SecureStore.getItemAsync(USER_KEY);
            return userJson ? JSON.parse(userJson) : null;
        } catch {
            return null;
        }
    },

    async setUser(user: User): Promise<void> {
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    },

    async removeUser(): Promise<void> {
        await SecureStore.deleteItemAsync(USER_KEY);
    },

    async clearAll(): Promise<void> {
        await this.removeToken();
        await this.removeUser();
    }
};

// HTTP helper
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = await tokenService.getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new ApiError(response.status, errorData.detail || 'Request failed');
    }

    return response.json();
}

// Auth Service
export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiRequest<AuthResponse>('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        // Store token and user
        await tokenService.setToken(response.access_token);
        await tokenService.setUser(response.user);

        return response;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiRequest<AuthResponse>('/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        // Store token and user
        await tokenService.setToken(response.access_token);
        await tokenService.setUser(response.user);

        return response;
    },

    async getCurrentUser(): Promise<User> {
        return apiRequest<User>('/me');
    },

    async logout(): Promise<void> {
        await tokenService.clearAll();
    },

    async isAuthenticated(): Promise<boolean> {
        const token = await tokenService.getToken();
        return token !== null;
    }
};

export default authService;
