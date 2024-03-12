



function CreateService(token, componentClass) {
    di.registerDi(token, new componentClass());
}