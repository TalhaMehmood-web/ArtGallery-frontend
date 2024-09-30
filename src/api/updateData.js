
import axiosInstance from "../utils/AxiosConfig";

export const updateData = async (endpoint, fieldsToUpdate = null) => {
    try {

        const data = await axiosInstance.put(endpoint, fieldsToUpdate)
        return data;
    } catch (error) {
        console.log(error);
        throw error
    }
}