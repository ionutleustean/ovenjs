


 CreateService('store-service', class StoreService {
    products = [];

    add(product) {
        this.products.push(product);
    }

    remove(product) {
        this.products = this.products.filter(p => p !== product);
    }
});