



 SlideOne = CreateComponent({selector: 'store-slide-one-component'}, class {

    productsService = inject('store-service')
     toggle(){
         if(this.productsService.products.find(p => p === 'Diavola')) {
            this.productsService.remove('Diavola')
         }
         else{
            this.productsService.add('Diavola')
         }
     }

    render() {
        return `
        <div class="slide slide-one">
            <div class="slide-content" onclick="componentMap.get('store-slide-one-component').instance.toggle()"> 
                <h1> Diavola </h1>
                <p> Sos de rosii, mozzarella, salam spianata calabra, ‘Nduja calabra (si mai picanta) </p>
            </div>
        </div>
        `
    }
})