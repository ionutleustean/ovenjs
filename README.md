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