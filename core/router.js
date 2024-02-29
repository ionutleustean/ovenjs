




router = (routerConfig) => {

    const config = [...routerConfig];



    function activateComponent() {
        const hash = window.location.hash;
        config.find(route => {
            if (route.path === hash) {
              renderComponent(route.component);
            }
        })
    }

    function renderComponent (component) {
        this.document.getElementById("outlet").innerHTML = `<div id="${component.meta.selector}"> </div>`
        render.init(component)
    }



    window.addEventListener('hashchange', () => {
        activateComponent()
    })


    activateComponent();
}