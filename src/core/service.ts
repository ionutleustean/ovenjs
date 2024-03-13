import {di} from "./dependency-injection";


export function CreateService(token, componentClass) {
    di.registerDi(token, new componentClass());
}