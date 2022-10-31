// store/index.js

import { createStore } from "vuex";

export default createStore({
 state: {
    iframeStatus: false,
    packageId: 0,
    affiliateId: 0,
    bookingId: null,
    formData: null,
    tourPackage: null,
    customer: null
 },
 getters: {
    iframeStatus: state => {
        return state.iframeStatus;
    },
    packageId: state => {
        return state.packageId;
    },
    affiliateId: state => {
        return state.affiliateId;
    },
    bookingId: state => {
        return state.bookingId;
    },
    formData: state => {
        return state.formData;
    },
    tourPackage: state => {
        return state.tourPackage;
    },
    customer: state => {
        return state.customer;
    }
 },
 mutations: {
    IFRAME_STATUS(state, iframeStatus) {
        state.iframeStatus = iframeStatus;
    },
    PACKAGE_ID(state, packageId) {
        state.packageId = packageId;
    },
    AFFILIATE_ID(state, affiliateId) {
        state.affiliateId = affiliateId;
    },
    BOOKING_ID(state, bookingId) {
        state.bookingId = bookingId;
    },
    FORM_DATA(state, formData) {
        state.formData = formData;
    },
    TOUR_PACKAGE(state, tourPackage) {
        state.tourPackage = tourPackage;
    },
    CUSTOMER(state, customer) {
        state.customer = customer;
    }
 },
 actions: {
    storeIframeStatus({ commit }, iframeStatus) {
        commit('IFRAME_STATUS', iframeStatus);
    },
    storePackageId({ commit }, packageId) {
        commit('PACKAGE_ID', packageId);
    },
    storeAffiliateId({ commit }, affiliateId) {
        commit('AFFILIATE_ID', affiliateId);
    },
    storeBookingId({ commit }, bookingId) {
        commit('BOOKING_ID', bookingId);
    },
    storeFormData({ commit }, formData) {
        commit('FORM_DATA', formData);
    },
    storeTourPackage({ commit }, tourPackage) {
        commit('TOUR_PACKAGE', tourPackage);
    },
    storeCustomer({ commit }, customer) {
        commit('CUSTOMER', customer);
    }
 }
});