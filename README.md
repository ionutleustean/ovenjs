
# EX_01_Router


## index.html

    1. Create 2 pages
    2. Create a navigation bar
    3. Create a router configuration
    4. Create a router implementation

``` html
    <nav class="nav">
        <div class="identity"> <img src="./public/pizza_js.svg" alt="logo" class="logo"> Pizza </div>
        <div>
            <a class="button primary" href="#"> Home </a>
            <a class="button primary" href="#store"> Store </a>
        </div>
    </nav>
    
    <div id="outlet"> </div>
    <script src="core/router.js"></script>
    <script src="app/feature-home/home.js"></script>
    <script src="app/feature-store/store.js"></script>
    <script src="main.js"></script>
```


```js

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

//router


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
        this.document.getElementById("outlet").innerHTML = (new component()).render();
    }



    window.addEventListener('hashchange', () => {
        activateComponent()
    })


    activateComponent();
}

//component

class Home {
    render() {
        return `
      <div class="home">
        <div class="home-container"> 
            <h1>Home</h1>
            <p>Welcome to our home page</p>
        </div>
      </div>
    `;
    }
}
```



# EX_02_RenderingEngine
    1. Create a new file named render.js
    2. Store components in a Component Map
    3. Create a reder function that takes a component metadeta and render it
    4. Create a function that provide the component metadata



``` js


// component.js

function CreateComponent(meta, componetClass) {
    return {
        meta: {
            ...meta
        },
        component: componetClass
    }
}

// existing components 

const Home = CreateComponent({selector: 'home-component'} , class { ... }


// render.js

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



```





# EX_03_RenderingChilds

    1. Create 3 products components
    2. Render child components in store component

```js 
// router.js

    function renderComponent (component) {
        this.document.getElementById("outlet").innerHTML = `<div id="${component.meta.selector}"> </div>`
        render.init(component)
    }


// render.js
init(componentMetadata) {

        const instance = new componentMetadata.component();

        componentMap.set(componentMetadata.meta.selector, instance);


        window.document.getElementById(componentMetadata.meta.selector).innerHTML = instance.render();

        if(componentMetadata.meta.children){
            componentMetadata.meta.children.forEach(child =>{
                render.init(child);
            })
        }


    }



// store.js
   <div id="store-slide-one-component"> </div>
            <div id="store-slide-two-component"> </div>
            <div id="store-slide-three-component"> </div>



 Store = CreateComponent({
     selector: 'store-component',
     children: [SlideOne, SlideTwo, SlideThree],
 }, class { ... } 

```
