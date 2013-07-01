
angular.module('tbz').
factory('DataService', ['$resource', function ($resource) {
    var url = 'https://api.mongolab.com/api/1/databases/tbz/collections/';
    var apiKey = '';

    var resource = $resource(
        url + ":collection/",
        {
            apiKey: apiKey,
            q: {},      // q: JSON queryreference
            c: false,   // c: returns the result count for this query
            f: {},      // f: returned fields; { <field>: <val>, ... }
                        //    val = 1 for include, 0 for exclude
            fo: false,  // fo: return a single object from the result set
            s: {},      // s: sort order (1—asc; -1—desc) { <f> : <ord> }
            sk: 0,      // sk: number of results to skip in the result set
            l: 0        // l: limit for the number of results
        },
        {
            // GETs
            // query: {
            //     method: "GET",
            //     params: { },
            //     isArray: isAry
            // },
            getUser: {
                method: "GET",
                params: {
                    collection: 'users',
                    fo: true
                },
                isArray: false
            },
            getTemplate: {
                method: "GET",
                params: {
                    collection: 'templates',
                    fo: true
                },
                isArray: false
            },

            // POSTs
            // insert: {
            //     method: "POST",
            //     params: {}
            // },
            addUser: {
                method: "POST",
                // headers: { contentType: "application/json" },
                params: {
                    collection: 'users'
                }
            },
            addTemplate: {
                method: "POST",
                // headers: { contentType: "application/json" },
                params: {
                    collection: 'templates'
                }
            },
            addSheet: {
                method: "POST",
                // headers: { contentType: "application/json" },
                params: {
                    collection: 'characters'
                }
            }
        }
    );

    return resource;
}]);