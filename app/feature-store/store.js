



 Store = CreateComponent({
     selector: 'store-component',
     children: [SlideOne, SlideTwo, SlideThree, SlideFour],
 }, class {

     globalMessage = inject('globalString')

     productsService = inject('store-service')

     slideIndex = 0

     slideLength = 4

     forTitle = 'Taraneasca'

     onInit() {
         console.log(this.productsService)

         console.log('store init')
     }

     onDestroy() {
            console.log('store destroy')
     }

     onChange(changes) {
         console.log('store change', changes)
     }

     alertClickOnLastSlide = () => {
         alert('click on last slide')
     }

     nextSlide = () => {

         this.slideIndex = this.slideIndex === this.slideLength - 1 ? 0 : this.slideIndex + 1;
         console.log('next slide', this.slideIndex)
         render.render('store-component')
     }

     prevSlide = () => {
         this.slideIndex = this.slideIndex === 0 ? this.slideLength - 1 : this.slideIndex - 1;
         console.log('next slide', this.slideIndex)

     }

    render() {
        return `
        <div class="store">
            <div> 
                Store ${componentMap.get('store-component').instance.productsService.products.length}
                <span> <button class="button primary" onclick="componentMap.get('store-component').instance.prevSlide()"> prev </button> </span>
                <span> <button class="button primary" onclick="componentMap.get('store-component').instance.nextSlide()"> next </button> </span>
                <span> ${componentMap.get('store-component').instance.slideIndex} </span>
             </div>
            
            
            ${ componentMap.get('store-component').instance.slideIndex === 0 ?  '<div id="store-slide-one-component"> </div>' : ''}
            ${ componentMap.get('store-component').instance.slideIndex === 1 ?  '<div id="store-slide-two-component"> </div>' : ''}
            ${ componentMap.get('store-component').instance.slideIndex === 2 ?  '<div id="store-slide-three-component"> </div>' : ''}
            ${ componentMap.get('store-component').instance.slideIndex === 3 ?  
                '<div id="store-slide-four-component" data-title="forTitle" data-onTitleClick="alertClickOnLastSlide"> </div>' 
            : ''}
     
        </div>
        `
    }
})