import axios from "../utils/AxiosConfig";

export const deleteData = async (endpoint) => {
    try {

        const data = await axios.delete(endpoint)

        return data;
    } catch (error) {
        console.log(error);
        throw error
    }
}