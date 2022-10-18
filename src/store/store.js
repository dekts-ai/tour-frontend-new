// store/index.js

import { createStore } from "vuex";

export default createStore({
 state: {
    bookingId: null,
    formData: null,
    tourPackage: null
 },
 getters: {
    bookingId: state => {
        return state.bookingId;
    },
    formData: state => {
        return state.formData;
    },
    tourPackage: state => {
        return state.tourPackage;
    }
 },
 mutations: {
    BOOKING_ID(state, bookingId) {
        state.bookingId = bookingId;
    },
    FORM_DATA(state, formData) {
        state.formData = formData;
    },
    PACKAGE(state, tourPackage) {
        state.tourPackage = tourPackage;
    }
 },
 actions: {
    storeBookingId({ commit }, bookingId) {
        commit('BOOKING_ID', bookingId);
    },
    storeFormData({ commit }, formData) {
        commit('FORM_DATA', formData);
    },
    storeTourPkgDetails({ commit }, tourPackage) {
        commit('PACKAGE', tourPackage);
    }
 }
});