class Product {
    #name;
    #description;
    #price;
    #stock;
    #image;

    constructor(data) {
        this.#name = data.name;
        this.#description = data.description || "Sin descripción";
        this.#price = data.price;
        this.#stock = data.stock || 0;
        this.#image = data.image || "/images/default-product.png";
    }

    isAvailable() {
        return this.#stock > 0;
    }

    toDatabase() {
        return {
            name: this.#name,
            description: this.#description,
            price: this.#price,
            stock: this.#stock,
            image: this.#image
        };
    }
}

module.exports = Product;
