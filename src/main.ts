import {router} from "./core/router";
import {Home} from "./app/feature-home/home";
import {Store} from "./app/feature-store/store";
import {di} from "./core/dependency-injection";

const routerConfig = [
    {
        path: '',
        component: Home
    },
    {
        path: '#store',
        component: Store
    }
]

router(routerConfig);