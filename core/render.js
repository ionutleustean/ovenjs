






const componentMap = new Map();

logComponentMap = () => {
    console.log(componentMap);
}


const render =  {



    init(componentMetadata) {

        const instance = new componentMetadata.component();

        componentMap.set(componentMetadata.meta.selector, instance);

        window.document.getElementById(componentMetadata.meta.selector).innerHTML = instance.render();

    }
}