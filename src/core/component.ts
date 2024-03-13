



export function a<T>(a: T){return <T>a};


export function CreateComponent(meta, componetClass) {


    return {
        meta: {
            ...meta
        },
        component: componetClass
    }
}