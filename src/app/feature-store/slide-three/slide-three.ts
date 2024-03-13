import {CreateComponent} from "../../../core/component";
import {inject} from "../../../core/dependency-injection";


export const SlideThree = CreateComponent({selector: 'store-slide-three-component'}, class {

     productsService = inject('store-service')
     toggle(){
         if(this.productsService.products.find(p => p === 'Margherita')) {
             this.productsService.remove('Margherita')
         }
         else{
             this.productsService.add('Margherita')
         }
     }
    render() {
        return `
        <div class="slide slide-three">
            <div class="slide-content"  onclick="((this.toggle()))"> 
                <h1> Margherita </h1>
                <p> Sos de rosii, mozzarella, busuioc proaspat, ulei de masline extravirgin </p>
            </div>
        </div>
        `
    }
})