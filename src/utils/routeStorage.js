export const routeStorage = {
    saveRoute: (route) => {
        try {
            localStorage.setItem('appRoute', route);
        } catch (error) {
            console.error("Error saving route:", error);
        }
    },

    getRoute: () => {
        try {
            return localStorage.getItem('appRoute');
        } catch (error) {
            console.error("Error getting route:", error);
            return null;
        }
    },

    removeRoute: () => {
        try {
            localStorage.removeItem('appRoute');
        } catch (error) {
            console.error("Error removing route:", error);
        }
    }
};
