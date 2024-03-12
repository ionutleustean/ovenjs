router = (routerConfig) => {

    const config = [...routerConfig];

    let activatedComponent = null;


    function activateComponent() {
        const hash = window.location.hash;
        config.find(route => {
            if (route.path === hash) {

                if (activatedComponent) {
                    render.destroy(activatedComponent.meta.selector);
                }

                renderComponent(route.component);
            }
        })
    }

    function renderComponent(component) {
        document.getElementById("outlet").innerHTML = `<div id="${component.meta.selector}"> </div>`
        activatedComponent = component;
        render.init(component)
    }


    window.addEventListener('hashchange', () => {
        activateComponent()
    })


    activateComponent();
}