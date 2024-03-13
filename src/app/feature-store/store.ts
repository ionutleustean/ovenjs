import {CreateComponent} from "../../core/component";
import {SlideFour} from "./slide-four/slide-four";
import {SlideOne} from "./slide-one/slide-one";
import {SlideTwo} from "./slide-two/slide-two";
import {SlideThree} from "./slide-three/slide-three";
import {inject} from "../../core/dependency-injection";
import { render } from "../../core/render";


export const Store = CreateComponent({
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
                Store ${ ((this.productsService.products.length))  }
                <span> <button class="button primary" onclick="((this.prevSlide()))"> prev </button> </span>
                <span> <button class="button primary" onclick="((this.nextSlide()))"> next </button> </span>
                <span> ${((this.slideIndex))} </span>
             </div>
            
           
            ${ ((this.slideIndex)) === 0 ?  '<div id="store-slide-one-component"> </div>' : ''}
            ${ ((this.slideIndex)) === 1 ?  '<div id="store-slide-two-component"> </div>' : ''}
            ${ ((this.slideIndex)) === 2 ?  '<div id="store-slide-three-component"> </div>' : ''}
            ${ ((this.slideIndex)) === 3 ?
      '<div id="store-slide-four-component" data-title="forTitle" data-onTitleClick="alertClickOnLastSlide"> </div>'
      : ''}
     
        </div>
        `
  }
})