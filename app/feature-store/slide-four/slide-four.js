
SlideFour = CreateComponent({selector: 'store-slide-four-component', inputs: ['title'], outputs: ['onTitleClick']}, class {

    title = null;

    onTitleClick = null;

    productsService = inject('store-service')
    toggle(){
        if(this.productsService.products.find(p => p === this.title)) {
            this.productsService.remove(this.title)
        }
        else{
            this.productsService.add(this.title)
        }
    }

    render() {
        return `
        <div class="slide slide-one"  onclick="((onTitleClick()))">
            <div class="slide-content" onclick="((toggle()))"> 
                <h1> ${((title))} </h1>
                <p> Sos de rosii, mozzarella, salam spianata calabra, ‘Nduja calabra (si mai picanta) </p>
            </div>
        </div>
        `
    }
})