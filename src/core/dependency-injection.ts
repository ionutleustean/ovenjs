


export const  di = function() {
    let di = new Map();

    const registerDiInside = (token, instance) => {
        di.set(token, instance);
    }

    const injectInside = (token) => {
        return di.get(token);
    }

    return {
        registerDi: registerDiInside,
        inject: injectInside
    }
}();


di.registerDi('globalString', 'Hello World!');


export const inject = di.inject;