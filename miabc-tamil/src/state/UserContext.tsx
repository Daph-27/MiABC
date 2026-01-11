import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the progress shape
interface ModuleProgress {
    unlocked: boolean;
    score: number; // 0-100
    passed: boolean;
}

interface UserData {
    email: string;
    learnerName: string;
    grade: string;
    representativeName: string;
}

interface UserContextType {
    progress: Record<string, ModuleProgress>;
    unlockModule: (moduleId: string) => void;
    updateScore: (moduleId: string, score: number) => void;
    isUnlocked: (moduleId: string) => boolean;
    isAuthenticated: boolean;
    userData: UserData | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (formData: any) => Promise<boolean>;
    logout: () => void;
}

const defaultProgress: Record<string, ModuleProgress> = {
    'Alphabet': { unlocked: true, score: 0, passed: false }, // First one always open
    // Others locked by default
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<Record<string, ModuleProgress>>(defaultProgress);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    // In a real app, load from Firestore/AsyncStorage here
    useEffect(() => {
        // Simulated load - check if user is logged in
        console.log('Loading user progress...');
        // TODO: Check AsyncStorage for saved auth token
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // TODO: Implement actual Firebase authentication
            console.log('Logging in:', email);
            
            // Simulated login for development
            if (email && password) {
                setIsAuthenticated(true);
                setUserData({
                    email,
                    learnerName: 'Test Learner',
                    grade: 'First',
                    representativeName: 'Test Parent',
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (formData: any): Promise<boolean> => {
        try {
            // TODO: Implement actual Firebase registration
            console.log('Registering user:', formData);
            
            // Simulated registration for development
            if (formData.email && formData.password) {
                // Registration successful, but don't auto-login
                return true;
            }
            return false;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserData(null);
        setProgress(defaultProgress);
    };

    const unlockModule = (moduleId: string) => {
        setProgress(prev => ({
            ...prev,
            [moduleId]: { ...prev[moduleId], unlocked: true }
        }));
    };

    const updateScore = (moduleId: string, score: number) => {
        setProgress(prev => {
            const isPassed = score >= 80;
            return {
                ...prev,
                [moduleId]: { ...prev[moduleId], score, passed: isPassed }
            };
        });
    };

    const isUnlocked = (moduleId: string) => {
        // If it's the first module, it's always unlocked
        if (moduleId === 'Alphabet') return true;

        // Check if it's explicitly unlocked
        if (progress[moduleId]?.unlocked) return true;

        // Check Previous Module Logic (Sequential Gating)
        // This is a simplified map. Real logic needs the ordered list.
        const modules = ['Alphabet', 'Sounds', 'Mathematics', 'Family', 'Write', 'Read', 'Complete', 'Words', 'Festivals', 'Colors'];
        const index = modules.indexOf(moduleId);
        if (index > 0) {
            const prevModule = modules[index - 1];
            const prevData = progress[prevModule];
            // Unlock if previous is passed
            return prevData?.passed || false;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ 
            progress, 
            unlockModule, 
            updateScore, 
            isUnlocked,
            isAuthenticated,
            userData,
            login,
            register,
            logout,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
