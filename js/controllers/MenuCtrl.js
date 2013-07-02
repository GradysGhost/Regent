
angular.module('tbz').
controller('MenuCtrl', function ($scope, DataService, CardService) {

    $scope.login = {
        show: true,
        mode: 'login',
        admin: false,
        player: '',
        processing: false
    };

    $scope.menu = {
        0: {
            name: "Characters",
            type: "category",
            show: true,
            collapsed: false,
            alwaysShow: false,
            items: [
                {
                    name: "New Character",
                    icon: "option-offset icon-plus-sign",
                    func: function () {
                        CardService.addCard({
                            type: "editor",
                            data: "sheet"
                        });
                    }
                }
            ]
        },
        1: {
            name: "Reference",
            type: "category",
            show: true,
            collapsed: true,
            alwaysShow: false,
            items: []
        },
        2: {
            name: "Notes",
            type: "category",
            show: true,
            collapsed: true,
            alwaysShow: false,
            items: []
        },
        3: {
            name: "Settings",
            type: "category",
            collapsed: true,
            alwaysShow: true,
            items: []
        },
        4: {
            name: "Logout",
            type: "button",
            alwaysShow: true,
            func: function () { }
        }
    };

    $scope.menuAlerts = [];


    // DEBUG
    $scope.debug = function () {
        $scope.login.admin = true;
        $scope.login.player = "nando";
        $scope.loadMenu();
        $scope.login.show = false;
    };

    /*** Login Functions ***/

    $scope.toggleLoginMode = function () {
        var inLoginMode = $scope.login.mode === 'login';
        $scope.login.mode = ( inLoginMode ? 'register' : 'login');
        setFocus("username");
    };

    $scope.inRegisterMode = function () {
        return $scope.login.mode === 'register';
    };

    $scope.inLoginMode = function () {
        return $scope.login.mode === 'login';
    };

    $scope.loginUser = function (un, pass) {
        $scope.menuAlerts = [];

        if (un === undefined || un.trim() === '') {
            $scope.addMenuAlert("Please provide a username.");
            setFocus("username");
            return;
        }

        if ( pass === undefined || pass.trim() === '') {
            $scope.addMenuAlert("Please provide a password.");
            setFocus("password");
            return;
        }

        $scope.login.processing = true;

        DataService.getUser(
            { q: { name: un, password: pass } },
            function (response) {
            $scope.login.processing = false;

            if (response.hasOwnProperty("name")) {
                $scope.login.admin = response.admin;
                $scope.login.player = response.name;
                $scope.loadMenu();
                $scope.login.show = false;
            } else {
                $scope.addMenuAlert("Incorrect username or password.");
                $scope.username = "";
                $scope.password = "";
                setFocus("username");
                return;
            }
        });
    };

    $scope.registerUser = function (un, pass, passr) {
        $scope.menuAlerts = [];

        if (un === undefined || un.trim() === '') {
            $scope.addMenuAlert("Please provide a username.");
            setFocus("username");
            return;
        }

        if ( pass === undefined || pass === '') {
            $scope.addMenuAlert("Please provide a password.");
            setFocus("password");
            return;
        }

        if ( passr === undefined || passr === '') {
            $scope.addMenuAlert("Please re-enter the password.");
            setFocus("passwordRepeat");
            return;
        }

        if ( passr !== pass) {
            $scope.addMenuAlert("Passwords do not match.");
            $scope.password = "";
            $scope.passwordRepeat = "";
            setFocus("password");
            return;
        }

        $scope.login.processing = true;

        var user = {
            name: un,
            password: pass,
            admin: false
        };

        DataService.addUser(user, function (response) {
            $scope.login.processing = false;

            if (response.hasOwnProperty("name")) {
                $scope.login.show = false;
            } else {
                $scope.addMenuAlert("Error creating new user.");
                return;
            }
        });
    };


    /*** Menu Alert Functions ***/

    $scope.addMenuAlert = function(msg) {
        $scope.menuAlerts.push({type: 'error', msg: msg});
    };

    $scope.closeMenuAlert = function(index) {
        $scope.menuAlerts.splice(index, 1);
    };


    /*** Display Functions ***/

    $scope.getCaret = function (type, state) {
        if (type !== "category")
            return '';

        return (state ? "icon-caret-right" : "icon-caret-down");
    };

    $scope.loadMenu = function () {
        $scope.loadMenu_Characters();
    };

    $scope.loadMenu_Characters = function () {
        var filter = ($scope.login.admin ? {} : { "bio.player": $scope.login.player });

        DataService.getCharacters(
            { q: filter, f: { "bio.name": 1, "bio.player": 1 } },
            function (response) {
                if (!(response instanceof Array)) {
                    $scope.addMenuAlert("Error loading characters.");
                    return;
                }

                response.forEach(function (item) {
                    $scope.menu[0].items.push({
                        name: item.bio.name,
                        icon: "option-offset icon-user",
                        func: function () { $scope.addSheet(item.bio.name); }
                    });
                });
            }
        );
    };

    $scope.addSheet = function (name) {
        DataService.getCharacter(
            { q: { "bio.name": name } },
            function (response) {
                if (response.hasOwnProperty("_id")) {
                    CardService.addCard({
                        type: "sheet",
                        data: response
                    });
                } else {
                    $scope.addMenuAlert("Error loading character sheet.");
                    return;
                }
            }
        );
    };
});

// JS Helpers
var setFocus = function (id) {
    document.getElementById(id).focus();
};