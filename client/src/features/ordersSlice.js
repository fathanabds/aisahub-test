import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import axiosClient from '../helpers/axiosClient';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    value: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalData: 0,
    },
  },
  reducers: {
    ordersReceived(state, action) {
      state.value = action.payload.orders;
      state.pagination = action.payload.pagination;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ordersReceived } = ordersSlice.actions;

export const fetchOrders =
  (search = '', status = '', page = 1) =>
  async (dispatch) => {
    try {
      const { data } = await axiosClient.get(`/orders?search=${search}&status=${status}&page=${page}`, {
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
