const componentMap = new Map();

logComponentMap = () => {
    console.log(componentMap);
}


const render = {

    rerenderAll: () => {
        componentMap.forEach((value, key) => {
            render.render(value.componentMetadata.meta.selector);
        });
    },

    render: (selector) => {
        const parentElement = window.document.getElementById(selector);

        if (!parentElement && componentMap.has(selector)) {
            render.destroy(selector);
            return;
        }


        if (parentElement) {
            const component = componentMap.get(selector);


            if(component && component.componentMetadata.meta.inputs) {
                render.bindInputs(component.instance,  component.componentMetadata.meta.inputs, component.componentMetadata.meta.parent, parentElement);
            }

            if (component.instance.onChange) {
                component.instance.onChange({old: null, new: null});
            }

            parentElement.innerHTML = component.instance.render();


            if (component.componentMetadata.meta.children) {
                component.componentMetadata.meta.children.forEach(child => {
                    if (componentMap.has(child.meta.selector)) {
                        render.render(child.meta.selector);
                    } else {
                        render.init(child, component);
                    }
                })
            }
        }
    },

    init(componentMetadata, parent) {

        if (componentMap.has(componentMetadata.meta.selector)) {
            render.destroy(componentMetadata.meta.selector);
            return;
        }

        const parentElement = window.document.getElementById(componentMetadata.meta.selector);




        if (parentElement) {
            const instance = new componentMetadata.component();

            if(componentMetadata.meta.inputs) {
                render.bindInputs(instance, componentMetadata.meta.inputs, parent, parentElement);
            }

            if (instance.onInit) {
                instance.onInit();
            }

            if(parent) {
                componentMetadata.meta.parent = parent;
            }

            componentMap.set(componentMetadata.meta.selector, {
                instance: instance,
                componentMetadata: {...componentMetadata}
            });
            parentElement.innerHTML = instance.render();

            if (componentMetadata.meta.children) {
                componentMetadata.meta.children.forEach(child => {
                    render.init(child);
                })
            }

        }
    },

    bindInputs(instance, inputs, parent, parentElement) {
        for(let input of inputs) {
            data = parentElement.getAttribute('data-' + input);
            instance[input] = parent.instance[data] ? parent.instance[data] : data;
        }
    },

    destroy(selector) {
        const component = componentMap.get(selector);
        if (component && component.componentMetadata.meta.children) {
            component.componentMetadata.meta.children.forEach(child => {
                render.destroy(child.meta.selector);
            })
        }
        if (component && component.instance.onDestroy) {
            component.instance.onDestroy();
        }
        componentMap.delete(selector);
    }
}