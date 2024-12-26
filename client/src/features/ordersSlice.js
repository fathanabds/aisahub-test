import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    value: [],
  },
  reducers: {
    ordersReceived(state, action) {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ordersReceived } = ordersSlice.actions;

export const fetchOrders = () => async (dispatch) => {
  try {
    const { data } = await axiosClient.get('/orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    dispatch(ordersReceived(data));
  } catch (error) {
    console.log(error);
    Swal.fire(error.response.data.message, '', 'error');
  }
};

export default ordersSlice.reducer;
