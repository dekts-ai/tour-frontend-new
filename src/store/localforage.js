import localforage from "localforage";

export const localForageService = localforage.createInstance({
    name: "NAT_DATABASE",
    version: 1.0,
    storeName: "NAT_STORAGE_OBJECT"
});

localForageService
    .setDriver([
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
    ])
    .then
    //   () => {
    //   // use this to test your db connection - delete later
    //   localForageService.setItem("testkey", "testvalue", function() {
    //     console.log(
    //       "Of the driver options given, localforage is using:" +
    //         localForageService.driver()
    //     );
    //   });
    // }
    ()
    .catch(error => {
        console.log("Error setting up storage cache: " + error);
    });

export default {
    localforage,
    localForageService
};
