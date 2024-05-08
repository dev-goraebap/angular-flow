export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const setAccessToken = (accessToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
};

export const removeAccessToken = (): void => {
    localStorage.removeItem('accessToken');
};