
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







# EX_04_ChangeDetection
    1. Create a slider for store
    2. Create 3 childs components
    2. Create a chage detection mechanism for rereading the data


## Data binding

```js 

Store = CreateComponent({
     selector: 'store-component',
     children: [SlideOne, SlideTwo, SlideThree],
 }, class {

     slideIndex = 0

     slideLength = 3
     nextSlide = () => {

         this.slideIndex = this.slideIndex === this.slideLength - 1 ? 0 : this.slideIndex + 1;
         console.log('next slide', this.slideIndex)
     }

     prevSlide = () => {
         this.slideIndex = this.slideIndex === 0 ? this.slideLength - 1 : this.slideIndex - 1;
         console.log('next slide', this.slideIndex)

     }

    render() {
        return `
        <div class="store">
            <div> 
                Store 
                <span> <button class="button primary" onclick="componentMap.get('store-component').instance.prevSlide()"> prev </button> </span>
                <span> <button class="button primary" onclick="componentMap.get('store-component').instance.nextSlide()"> next </button> </span>
                <span> ${componentMap.get('store-component').instance.slideIndex} </span>
             </div>
            
            
            ${ componentMap.get('store-component').instance.slideIndex === 0 ?  '<div id="store-slide-one-component"> </div>' : ''}
            ${ componentMap.get('store-component').instance.slideIndex === 1 ?  '<div id="store-slide-two-component"> </div>' : ''}
            ${ componentMap.get('store-component').instance.slideIndex === 2 ?  '<div id="store-slide-three-component"> </div>' : ''}
     
        </div>
        `
    }
})



// render.js
 

 init() {
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

render(selector) {
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
}


rerenderAll : () =>{
        componentMap.forEach((value, key) => {
            render.render(value.componentMetadata.meta.selector);
        });
},


//cd.js

setInterval(() => {
    render.rerenderAll();
}, 50

```
