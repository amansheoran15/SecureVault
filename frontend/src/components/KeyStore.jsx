class KeyStore{

    constructor() {
        "use strict";
        let self = this;
        self.db = null;  // Filled in when the open method succeeds
        self.dbName = "KeyStore";      // Arbitrarily selected
        self.objectStoreName = "keys"; // Arbitrarily selected

        // Method definitions go here
        self.open = function() {
            return new Promise(function(fulfill, reject) {
                var req = indexedDB.open(self.dbName, 1);
                req.onsuccess = function(evt) {
                    self.db = evt.target.result;
                    fulfill(self);
                };
                req.onfailure = function(evt) {
                    reject(evt.error);
                };
                req.onblocked = function(evt) {
                    reject(new Error("Database already open."));
                };
                req.onupgradeneeded = function(evt) {
                    self.db = evt.target.result;
                    if (!self.db.objectStoreNames.contains(self.objectStoreName)) {
                        var objectStore = self.db.createObjectStore(self.objectStoreName, {autoIncrement: true});
                        objectStore.createIndex("name", "name", {unique: false});
                        objectStore.createIndex("spki", "spki", {unique: false});
                    }
                }
            });
        };

        self.close = function() {
            return new Promise(function(fulfill, reject){
                self.db.close();
                self.db = null;
                fulfill();
            });
        };

        self.saveKey = function(key, name) {
            return new Promise(function(fulfill, reject) {
                if (!self.db) {  // No operation can be performed.
                    reject(new Error("KeyStore is not open."));
                }

                var savedObject = {
                    key:  key,
                    name: name,
                };

                var transaction = self.db.transaction([self.objectStoreName], "readwrite");
                transaction.onerror = function(evt) {reject(evt.error);};
                transaction.onabort = function(evt) {reject(evt.error);};
                transaction.oncomplete = function(evt) {fulfill(savedObject);};

                var objectStore = transaction.objectStore(self.objectStoreName);
                var request = objectStore.add(savedObject);

            });
        };

        self.getKey = function(propertyName, propertyValue) {
            return new Promise(function(fulfill, reject) {
                if (!self.db) { // No operation can be performed.
                    reject(new Error("KeyStore is not open."));
                }

                var transaction = self.db.transaction([self.objectStoreName], "readonly");
                var objectStore = transaction.objectStore(self.objectStoreName);
                var request;
                if (propertyName === "id") {
                    request = objectStore.get(propertyValue);
                } else if (propertyName === "name") {
                    request = objectStore.index("name").get(propertyValue);
                } else if (propertyName === "spki") {
                    request = objectStore.index("spki").get(propertyValue);
                } else {
                    reject(new Error("No such property: " + propertyName));
                }

                request.onsuccess = function(evt) {
                    fulfill(evt.target.result);
                };
                request.onerror = function(evt) {
                    reject(evt.error);
                };
            });
        };

        self.listKeys = function() {
            return new Promise(function(fulfill, reject) {
                if (!self.db) {
                    reject(new Error("KeyStore is not open."));
                }

                var list = [];

                var transaction = self.db.transaction([self.objectStoreName], "readonly");
                transaction.onerror = function(evt) {reject(evt.error);};
                transaction.onabort = function(evt) {reject(evt.error);};

                var objectStore = transaction.objectStore(self.objectStoreName);
                var cursor = objectStore.openCursor();

                cursor.onsuccess = function(evt) {
                    if (evt.target.result) {
                        list.push({id: evt.target.result.key, value: evt.target.result.value});
                        evt.target.result.continue();
                    } else {
                        fulfill(list);
                    }
                }
            });
        };


    }
}

export default KeyStore;