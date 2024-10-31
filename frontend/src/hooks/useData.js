import axios from '../api/axiosInstance';

export const useData = () => {
    const fetchData = async () => await axios.get('/data');
    const createData = async (data) => await axios.post('/data', data);
    const getDataById = async (id) => await axios.get(`/data/${id}`);
    const getDataByType = async (type) => await axios.get(`/data/type/${type}`);
    const updateData = async (id, data) => await axios.put(`/data/${id}`, data);
    const deleteData = async (id) => await axios.delete(`/data/${id}`);

    return { fetchData, createData, getDataById, getDataByType, updateData, deleteData };
};
