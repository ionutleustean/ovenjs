



 Store = CreateComponent({
     selector: 'store-component',
     children: [SlideOne, SlideTwo, SlideThree],
 }, class {

    render() {
        return `
        <div class="store">
            <h1> Store </h1>
            
            
            <div id="store-slide-one-component"> </div>
            <div id="store-slide-two-component"> </div>
            <div id="store-slide-three-component"> </div>
        </div>
        `
    }
})