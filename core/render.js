






const componentMap = new Map();

logComponentMap = () => {
    console.log(componentMap);
}


const render =  {

    rerenderAll : () =>{
        componentMap.forEach((value, key) => {
            render.render(value.componentMetadata.meta.selector);
        });
    },

    render : (selector) => {
        const parentElement = window.document.getElementById(selector);

        if(parentElement){
            const component = componentMap.get(selector);
            parentElement.innerHTML = component.instance.render();

            if(component.componentMetadata.meta.children){
                component.componentMetadata.meta.children.forEach(child =>{
                    if(componentMap.has(child.meta.selector)) {
                        render.render(child.meta.selector);
                    }
                    else {
                        render.init(child);
                    }
                })
            }
        }
    },

    init(componentMetadata) {

        const parentElement = window.document.getElementById(componentMetadata.meta.selector);

        if(parentElement){

            const instance = new componentMetadata.component();

            componentMap.set(componentMetadata.meta.selector, {instance: instance, componentMetadata: componentMetadata});
            parentElement.innerHTML = instance.render();

            if(componentMetadata.meta.children){
                componentMetadata.meta.children.forEach(child =>{
                    render.init(child);
                })
            }
        }
    }
}