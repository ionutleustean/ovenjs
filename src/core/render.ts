



declare global {
    interface Window { componentMap: any; }
}

window.componentMap = new Map<string, any>();

export const logComponentMap = () => {
    console.log(window.componentMap);
}


export const render = {

    rerenderAll: () => {
        window.componentMap.forEach((value, key) => {
            render.render(value.componentMetadata.meta.selector);
        });
    },

    render: (selector) => {
        const parentElement = window.document.getElementById(selector);

        if (!parentElement && window.componentMap.has(selector)) {
            render.destroy(selector);
            return;
        }


        if (parentElement) {
            const component = window.componentMap.get(selector);


            if(component && component.componentMetadata.meta.inputs) {
                render.bindInputs(component.instance,  component.componentMetadata.meta.inputs, component.componentMetadata.meta.parent, parentElement);
            }

            if(component && component.componentMetadata.meta.outputs) {
                render.bindOutputs(component.instance,  component.componentMetadata.meta.outputs, component.componentMetadata.meta.parent, parentElement);
            }

            if (component.instance.onChange) {
                component.instance.onChange({old: null, new: null});
            }

            parentElement.innerHTML = component.instance.render();


            if (component.componentMetadata.meta.children) {
                component.componentMetadata.meta.children.forEach(child => {
                    if (window.componentMap.has(child.meta.selector)) {
                        render.render(child.meta.selector);
                    } else {
                        render.init(child, component);
                    }
                })
            }
        }
    },

    init(componentMetadata, parent?) {

        if (window.componentMap.has(componentMetadata.meta.selector)) {
            render.destroy(componentMetadata.meta.selector);
            return;
        }

        const parentElement = window.document.getElementById(componentMetadata.meta.selector);




        if (parentElement) {
            const instance = new componentMetadata.component();

            if(componentMetadata.meta.inputs) {
                render.bindInputs(instance, componentMetadata.meta.inputs, parent, parentElement);
            }

            if(componentMetadata.meta.outputs) {
                render.bindOutputs(instance, componentMetadata.meta.outputs, parent, parentElement);
            }

            if (instance.onInit) {
                instance.onInit();
            }

            if(parent) {
                componentMetadata.meta.parent = parent;
            }

            window.componentMap.set(componentMetadata.meta.selector, {
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
            const data = parentElement.getAttribute('data-' + input);
            instance[input] = parent.instance[data] ? parent.instance[data] : data;
        }
    },

    bindOutputs(instance, inputs, parent, parentElement) {
        for(let input of inputs) {
            const data = parentElement.getAttribute('data-' + input);
            instance[input] = parent.instance[data] ? parent.instance[data] : () => {console.error('no function')};
        }
    },

    destroy(selector) {
        const component = window.componentMap.get(selector);
        if (component && component.componentMetadata.meta.children) {
            component.componentMetadata.meta.children.forEach(child => {
                render.destroy(child.meta.selector);
            })
        }
        if (component && component.instance.onDestroy) {
            component.instance.onDestroy();
        }
        window.componentMap.delete(selector);
    }
}