import {CreateComponent} from "../../../core/component";
import {inject} from "../../../core/dependency-injection";

export const SlideFour = CreateComponent({selector: 'store-slide-four-component', inputs: ['title'], outputs: ['onTitleClick']}, class {

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
        // @ts-ignore
        return `
        <div class="slide slide-one"  onclick="((this.onTitleClick()))">
            <div class="slide-content" onclick="((this.toggle()))"> 
                <h1> ${((this.title))} </h1>
                <p> Sos de rosii, mozzarella, salam spianata calabra, ‘Nduja calabra (si mai picanta) </p>
            </div>
        </div>
        `
    }
})