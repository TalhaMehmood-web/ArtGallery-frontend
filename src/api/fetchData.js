import axios from "../utils/AxiosConfig";
export const fetchData = async (endpoint) => {
    try {
        console.log(endpoint);
        const response = await axios.get(endpoint);

        return response.data;
    } catch (error) {

        console.log(error);
        throw error

    }
};