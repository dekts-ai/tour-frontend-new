// store/index.js

import { createStore } from "vuex";
import { getUTCDateFromTimeZone } from '../utils/dateUtils';

// Plugin to persist Vuex state to localStorage
const localStoragePlugin = store => {
    // Restore state from localStorage on initialization
    const savedState = localStorage.getItem('appState');
    if (savedState) {
        store.replaceState(Object.assign({}, store.state, JSON.parse(savedState)));
    }

    // Subscribe to store mutations to save state
    store.subscribe((mutation, state) => {
        localStorage.setItem('appState', JSON.stringify(state));
    });
};

export default createStore({
    state: {
        iframeStatus: true,
        date: getUTCDateFromTimeZone(),
        tenantId: 0,
        tourOperatorId: 0,
        packageId: 0,
        affiliateId: 0,
        comboIds: 0,
        bookingIds: {},
        formData: null,
        tourPackage: null,
        tourPackageLogo: null,
        customer: null,
        slotId: 0,
        timeDate: null,
        hotelId: 0,
        cartItem: {},
        tabs: 1,
        mindChange: 0,
        packageOrder: [],
        currency: "USD",
        countryCode: "US"
    },
    getters: {
        iframeStatus: state => {
            return state.iframeStatus;
        },
        date: state => {
            return state.date;
        },
        tenantId: state => {
            return state.tenantId;
        },
        tourOperatorId: state => {
            return state.tourOperatorId;
        },
        packageId: state => {
            return state.packageId;
        },
        affiliateId: state => {
            return state.affiliateId;
        },
        comboIds: state => {
            return state.comboIds;
        },
        bookingIds: state => {
            return state.bookingIds;
        },
        formData: state => {
            return state.formData;
        },
        tourPackage: state => {
            return state.tourPackage;
        },
        tourPackageLogo: state => {
            return state.tourPackageLogo;
        },
        customer: state => {
            return state.customer;
        },
        slotId: state => {
            return state.slotId;
        },
        timeDate: state => {
            return state.timeDate;
        },
        hotelId: state => {
            return state.hotelId;
        },
        cartItem: state => {
            return state.cartItem;
        },
        tabs: state => {
            return state.tabs;
        },
        mindChange: state => {
            return state.mindChange;
        },
        packageOrder: state => {
            return state.packageOrder;
        },
        currency: state => {
            return state.currency;
        },
        countryCode: state => {
            return state.countryCode;
        }
    },
    mutations: {
        IFRAME_STATUS(state, iframeStatus) {
            state.iframeStatus = iframeStatus;
        },
        DATE(state, date) {
            state.date = date;
        },
        TENANT_ID(state, tenantId) {
            state.tenantId = tenantId;
        },
        TOUR_OPERATOR_ID(state, tourOperatorId) {
            state.tourOperatorId = tourOperatorId;
        },
        PACKAGE_ID(state, packageId) {
            state.packageId = packageId;
        },
        AFFILIATE_ID(state, affiliateId) {
            state.affiliateId = affiliateId;
        },
        COMBO_IDS(state, comboIds) {
            state.comboIds = comboIds;
        },
        BOOKING_IDS(state, bookingIds) {
            state.bookingIds = bookingIds;
        },
        FORM_DATA(state, formData) {
            state.formData = formData;
        },
        TOUR_PACKAGE(state, tourPackage) {
            state.tourPackage = tourPackage;
        },
        TOUR_PACKAGE_LOGO(state, tourPackageLogo) {
            state.tourPackageLogo = tourPackageLogo;
        },
        CUSTOMER(state, customer) {
            state.customer = customer;
        },
        SLOT_ID(state, slotId) {
            state.slotId = slotId;
        },
        TIME_DATE(state, timeDate) {
            state.timeDate = timeDate;
        },
        HOTEL_ID(state, hotelId) {
            state.hotelId = hotelId;
        },
        CART_ITEM(state, cartItem) {
            state.cartItem = cartItem;
        },
        TABS(state, tabs) {
            state.tabs = tabs;
        },
        MIND_CHANGE(state, mindChange) {
            state.mindChange = mindChange;
        },
        PACKAGE_ORDER(state, packageOrder) {
            state.packageOrder = packageOrder;
        },
        CURRENCY(state, currency) {
            state.currency = currency;
        },
        COUNTRY_CODE(state, countryCode) {
            state.countryCode = countryCode;
        }
    },
    actions: {
        storeIframeStatus({ commit }, iframeStatus) {
            commit('IFRAME_STATUS', iframeStatus);
        },
        storeDate({ commit }, date) {
            commit('DATE', date);
        },
        storeTenantId({ commit }, tenantId) {
            commit('TENANT_ID', tenantId);
        },
        storeTourOperatorId({ commit }, tourOperatorId) {
            commit('TOUR_OPERATOR_ID', tourOperatorId);
        },
        storePackageId({ commit }, packageId) {
            commit('PACKAGE_ID', packageId);
        },
        storeAffiliateId({ commit }, affiliateId) {
            commit('AFFILIATE_ID', affiliateId);
        },
        storeComboIds({ commit }, comboIds) {
            commit('COMBO_IDS', comboIds);
        },
        storeBookingIds({ commit }, bookingIds) {
            commit('BOOKING_IDS', bookingIds);
        },
        storeFormData({ commit }, formData) {
            commit('FORM_DATA', formData);
        },
        storeTourPackage({ commit }, tourPackage) {
            commit('TOUR_PACKAGE', tourPackage);
        },
        storeTourPackageLogo({ commit }, tourPackageLogo) {
            commit('TOUR_PACKAGE_LOGO', tourPackageLogo);
        },
        storeCustomer({ commit }, customer) {
            commit('CUSTOMER', customer);
        },
        storeSlotId({ commit }, slotId) {
            commit('SLOT_ID', slotId);
        },
        storeTimeDate({ commit }, timeDate) {
            commit('TIME_DATE', timeDate);
        },
        storeHotelId({ commit }, hotelId) {
            commit('HOTEL_ID', hotelId);
        },
        storeCartItem({ commit }, cartItem) {
            commit('CART_ITEM', cartItem);
        },
        storeTabs({ commit }, tabs) {
            commit('TABS', tabs);
        },
        storeMindChange({ commit }, mindChange) {
            commit('MIND_CHANGE', mindChange);
        },
        storePackageOrder({ commit }, packageOrder) {
            commit('PACKAGE_ORDER', packageOrder);
        },
        storeCurrency({ commit }, currency) {
            commit('CURRENCY', currency);
        },
        storeCountryCode({ commit }, countryCode) {
            commit('COUNTRY_CODE', countryCode);
        }
    },
    plugins: [localStoragePlugin]
});