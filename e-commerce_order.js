
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Customer ID: ", (customerId) => {
    rl.question("Enter Order Amount (Rs.): ", (amountInput) => {
        rl.question("Enter Customer Category (Premium/Regular): ", (categoryInput) => {
            rl.question("Enter Delivery Location (Local/Other): ", (locationInput) => {

                const orderAmount = Number(amountInput);
                const category = categoryInput.trim().toLowerCase();
                const location = locationInput.trim().toLowerCase();

                // Validate inputs
                if (
                    !customerId.trim() ||
                    amountInput.trim() === "" ||
                    !Number.isFinite(orderAmount) ||
                    orderAmount <= 0
                ) {
                    console.log("\nInvalid input. Please enter a valid customer ID and order amount.");
                    rl.close();
                    return;
                }

                if (!["premium", "regular"].includes(category)) {
                    console.log("\nInvalid customer category. Enter Premium or Regular.");
                    rl.close();
                    return;
                }

                if (!["local", "other"].includes(location)) {
                    console.log("\nInvalid delivery location. Enter Local or Other.");
                    rl.close();
                    return;
                }

                let discount = 0;
                let deliveryCharge = 0;

                // Membership discount
                if (category === "premium") {
                    discount = orderAmount * 0.15;
                } else {
                    discount = orderAmount * 0.05;
                }

                // Additional discount for orders above Rs. 5000
                if (orderAmount > 5000) {
                    discount += 500;
                }

                // Maximum discount is 20% of the original order amount
                const maximumDiscount = orderAmount * 0.20;
                discount = Math.min(discount, maximumDiscount);

                // Delivery charges
                if (orderAmount >= 3000) {
                    deliveryCharge = 0;
                } else if (location === "local") {
                    deliveryCharge = 50;
                } else {
                    deliveryCharge = 100;
                }

                // Calculate final payable amount
                const finalAmount = orderAmount - discount + deliveryCharge;

                // Generate order summary
                console.log("\n===== E-COMMERCE ORDER SUMMARY =====");
                console.log("Customer ID:", customerId);
                console.log("Customer Category:", categoryInput);
                console.log("Original Order Amount: Rs.", orderAmount.toFixed(2));
                console.log("Discount Amount: Rs.", discount.toFixed(2));
                console.log("Delivery Charge: Rs.", deliveryCharge.toFixed(2));
                console.log("Final Payable Amount: Rs.", finalAmount.toFixed(2));

                console.log(
                    "Order Summary:",
                    "Order processed successfully."
                );

                rl.close();
            });
        });
    });
});
