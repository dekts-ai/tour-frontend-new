// store/index.js

import { createStore } from "vuex";

export default createStore({
 state: {
    bookingId: null
 },
 getters: {
    bookingId: state => {
        return state.bookingId;
    },
 },
 mutations: {
    BOOKING_ID(state, bookingId) {
        state.bookingId = bookingId;
    },
 },
 actions: {
    storeBookingId({ commit }, bookingId) {
        commit('BOOKING_ID', bookingId);
    },
 }
});