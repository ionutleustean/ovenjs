import {CreateComponent} from "../../../core/component";
import {inject} from "../../../core/dependency-injection";


export const SlideTwo = CreateComponent({selector: 'store-slide-two-component'}, class {

  productsService = inject('store-service')
     toggle(){
         if(this.productsService.products.find(p => p === 'Mexicana')) {
             this.productsService.remove('Mexicana')
         }
         else{
             this.productsService.add('Mexicana')
         }
     }
    render() {
        return `
        <div class="slide slide-two">
            <div class="slide-content"  onclick="((this.toggle()))">
                <h1> Mexicana </h1>
                <p> Sos de rosii, mozzarella, salam picant spianata calabra, fasole rosie boabe, pepperoncino, oregano </p>
            </div>
        </div>
        `
    }
})