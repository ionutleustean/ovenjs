


const  di = function() {
    let di = new Map();

    registerDiInside = (token, instance) => {
        di.set(token, instance);
    }

    injectInside = (token) => {
        return di.get(token);
    }

    return {
        registerDi: registerDiInside,
        inject: injectInside
    }
}();


di.registerDi('globalString', 'Hello World!');


inject = di.inject;