



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
                Store ${ ((productsService.products.length)) }
                <span> <button class="button primary" onclick="((prevSlide()))"> prev </button> </span>
                <span> <button class="button primary" onclick="((nextSlide()))"> next </button> </span>
                <span> ${((slideIndex))} </span>
             </div>
            
           
            ${ ((slideIndex)) === 0 ?  '<div id="store-slide-one-component"> </div>' : ''}
            ${ ((slideIndex)) === 1 ?  '<div id="store-slide-two-component"> </div>' : ''}
            ${ ((slideIndex)) === 2 ?  '<div id="store-slide-three-component"> </div>' : ''}
            ${ ((slideIndex)) === 3 ?  
                '<div id="store-slide-four-component" data-title="forTitle" data-onTitleClick="alertClickOnLastSlide"> </div>' 
            : ''}
     
        </div>
        `
    }
})