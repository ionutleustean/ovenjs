



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