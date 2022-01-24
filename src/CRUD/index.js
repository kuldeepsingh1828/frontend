import axios from 'axios'
export const data = async (name) => {
    let response;
    if (name != '' && name != undefined)
        response = await axios.get(`Babba_3/DataLoading?name=${name}`);
    else response = await axios.get(`Babba_3/DataLoading`);
    return response.data;
}
export const AddData = async (data) => {
    const response = await axios.post('Babba_3/AddRow', data);
}

export const updateData = async (data) => {
    const response = await axios.post('Babba_3/updateRow', data);
}
export const deleteData = async (data) => {
    console.log(data)
    const response = await axios.delete(`Babba_3/deleteRow`, { data: { sl_no: data } });
    if (response.status == 'OK') return { response: 'Deleted' };
}