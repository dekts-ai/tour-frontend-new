// store/index.js

import { createStore } from "vuex";
import vuexPersist from "vuex-persist";
import { localForageService } from "@/store/localforage";
import pathify from "@/store/pathify";
import { make } from "vuex-pathify";

const state = {
   bookingId: null
};

const getters = {
   ...make.getters(state) // vuex-pathify
};

const mutations = {
   ...make.mutations(state) // vuex-pathify
};

const actions = {
   ...make.actions(state) // vuex-pathify
};

const vuexLocal = new vuexPersist({
   // vuex-persist
   storage: localForageService, //localForage
   asyncStorage: true,
   key: "vuexPersistStorage_default",
   supportCircular: true,
   saveState: async (key, state, storage) => {
      let data = state;
      console.log(data, storage);

      //   if (storage && data) {
      //   }
      storage.setItem(key, data);
   },
   restoreState: async function (key, storage) {
      let data = await storage.getItem(key);
      if (await data) {
         try {
            console.log(data);
         } catch (e) {
            console.log(e);
         }
      }
      return await data;
   }
});

const plugins = [pathify.plugin, vuexLocal.plugin];

export default createStore({
   namespaced: false,
   state,
   getters,
   mutations,
   actions,
   // modules,
   plugins
});