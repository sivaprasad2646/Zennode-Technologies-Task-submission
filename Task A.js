class ShoppingCart {
        constructor(){
            //Here i initialized an array to store products in shopping cart
            this.cart = []
            // Here I defined the discount rules and fee constants
            this.discounts = {
                "flat_10_discount":10,
                "bulk_5_discount":0.05,
                "bulk_10_discount":0.10,
                "tiered_50_discount":0.50,
            }
            this.giftWrapFee = 1,
            this.shippingFeePerPackage = 5,
            this.itemsPerPackage = 10
        }
        //Here is the method to add a product to the shopping cartt
        addProduct(name,price,quantity,isGiftWrapped){
            //I will check whether the product is already in the cart?
            const existingProduct = this.cart.find(product => product.name=== name)

            if (existingProduct){
                // if the product is already in the cart, i will update its quantity and gift wrapping status
                existingProduct.quantity += quantity
                existingProduct.isGiftWrapped += isGiftWrapped;
            }else{
                // if the product is not the cart, add a new entry for it
                this.cart.push({
                    name,
                    price,
                    quantity,
                    isGiftWrapped
                });
            }
        }
        // Here is the method to calulate the discount applied based on the discount rules
        calculateDiscount(){
            // I will calculate the totalquantity of all products in the cart
            const totalQunatity = this.cart.reduce((acc,item)=>acc+item.quantity,0);
            // considering the discount rules 
            if (totalQunatity > 30){
                // if total quantity is greater than 30, find the first product with quantity > 15 and apply a 50% discoutn
                const eligibleProduct = this.cart.find(item => item.quantity > 15);
                if (eligibleProduct){
                    return ["tired_50_discount", eligibleProduct.price*eligibleProduct.qunatity*this.discounts.tiered_50_discount];

                }
            }
            if (totalQunatity>20){
                // if total quantity is greater than 20, i will apply 10% discount on the total price according to discount rules
                return ["bulk_10_discount", this.cart.reduce((acc,item) => acc+item.quantity,0)* this.discounts.bulk_10_discount]

            }
            // if any product qunatit is greater than 10, apply a 5% discount on that products total price
            const bulk5Product = this.cart.find(item => item.quantity > 10);
            if (bulk5Product){
                // it will return
                return ["bulk_5_discount",bulk5Product.price*bulk5Product.quantity*this.discounts.bulk_5_discount];
            }
            // if the total price of all products is greater than $200, i will apply flat $10 discount
            if(this.cart.reduce((acc,item)=>acc+item.price * item.quantity,0)>200){
                return ["flat_10_discount",10];
            }
            // if no discount is applicable, it will return [null,10]
            return [null,0]
        }
        // Here is the methiod to calculate the shipping fee based on the totalquantity of the products in the cart 
        calculateShippingFee(){
            const totalQunatity = this.cart.reduce((acc,item)=>acc+item.quantity,0);
            // calculated the shipping fee based on the number of packages needed 
            return Math.floor(totalQunatity/this.itemsPerPackage)* this.shippingFeePerPackage;
        }
        // Here is the method to display sample receipt with product details, subtotal, discounts, shippingfees and total
        displayReceipt(){
            // claculated the subtotal for all products in the cart
            const subTotal = this.cart.reduce((acc,item)=> acc+item.price * item.quantity,0);
            //calculated the discount applied 
            const [discountName,discountedAmount] = this.calculateDiscount();
            //Caluculated the shipping fees
            const shippingFee = this.calculateShippingFee();
            //calculated the total amount including discounts, fees, and the original gift wrap fee
            const total = subTotal-discountedAmount+shippingFee+(this.giftWrapFee*this.cart.reduce((acc,item)=>acc+item.isGiftWrapped,0));
            console.log("ProductName | Quantity | Total Amount")
            this.cart.forEach((item)=> console.log(`${item.name} | ${item.quantity} | ${item.price * item.quantity}`))
            // Final Output 
            console.log("subtotal:", subTotal)
            console.log("Discount Applied:", discountName, discountedAmount )
            console.log("shippingFee:", shippingFee)
            console.log("Gift Wrap Fee:", this.giftWrapFee*this.cart.reduce((acc,item)=>acc+item.isGiftWrapped,0));
            console.log("Total:", total)
        }

        
}
//Function 
const cart = new ShoppingCart();
cart.addProduct("ProductA", 20,5,1);
cart.addProduct("ProductB",40,12,0);
cart.addProduct("ProductC", 50,8,1);

cart.displayReceipt();