
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Order ID: ", (orderId) => {
    rl.question("Enter Order Amount (Rs.): ", (amountInput) => {
        rl.question("Enter Delivery Distance (km): ", (distanceInput) => {
            rl.question("Enter Customer Type (Member/Regular): ", (customerType) => {
                rl.question("Enter Payment Method (Cash/UPI/Card): ", (paymentMethod) => {

                    const orderAmount = Number(amountInput);
                    const distance = Number(distanceInput);

                    const customer = customerType.trim().toLowerCase();
                    const payment = paymentMethod.trim().toLowerCase();

                    // Validate order details
                    if (
                        !orderId.trim() ||
                        amountInput.trim() === "" ||
                        distanceInput.trim() === "" ||
                        !Number.isFinite(orderAmount) ||
                        !Number.isFinite(distance) ||
                        orderAmount <= 0 ||
                        distance < 0
                    ) {
                        console.log("\nOrder Status: Invalid");
                        console.log("Remarks: Invalid order amount, distance, or order ID.");
                        rl.close();
                        return;
                    }

                    // Validate customer type
                    if (!["member", "regular"].includes(customer)) {
                        console.log("\nOrder Status: Invalid");
                        console.log("Remarks: Unsupported customer type.");
                        rl.close();
                        return;
                    }

                    // Validate payment method
                    if (!["cash", "upi", "card"].includes(payment)) {
                        console.log("\nOrder Status: Invalid");
                        console.log("Remarks: Unsupported payment method.");
                        rl.close();
                        return;
                    }

                    let discount = 0;
                    let deliveryCharge = 0;
                    let additionalCharges = 0;
                    let promotionalDiscount = 0;

                    // Membership discount
                    if (customer === "member") {
                        if (orderAmount >= 1000) {
                            discount = orderAmount * 0.10;
                        } else {
                            discount = orderAmount * 0.05;
                        }
                    }

                    // Promotional discount for orders above Rs. 1500
                    if (orderAmount >= 1500) {
                        promotionalDiscount = orderAmount * 0.05;
                    }

                    // Small-order charge
                    if (orderAmount < 500) {
                        additionalCharges += 30;
                    }

                    // Delivery charges
                    if (orderAmount > 1000 && distance <= 5) {
                        deliveryCharge = 0;
                    } else {
                        deliveryCharge = 40;

                        if (distance > 5) {
                            deliveryCharge += (distance - 5) * 10;
                        }
                    }

                    // Calculate final amount
                    const totalDiscount = discount + promotionalDiscount;
                    const finalAmount =
                        orderAmount - totalDiscount +
                        deliveryCharge + additionalCharges;

                    // Display bill
                    console.log("\n===== FOOD DELIVERY BILL =====");
                    console.log("Order ID:", orderId);
                    console.log("Customer Type:", customerType);
                    console.log("Order Amount: Rs.", orderAmount.toFixed(2));
                    console.log("Membership Discount: Rs.", discount.toFixed(2));
                    console.log("Promotional Discount: Rs.", promotionalDiscount.toFixed(2));
                    console.log("Total Discount: Rs.", totalDiscount.toFixed(2));
                    console.log("Delivery Charge: Rs.", deliveryCharge.toFixed(2));
                    console.log("Additional Charges: Rs.", additionalCharges.toFixed(2));
                    console.log("Final Payable Amount: Rs.", finalAmount.toFixed(2));
                    console.log("Order Status: Valid");
                    console.log(
                        "Remarks:",
                        promotionalDiscount > 0
                            ? "Order qualifies for promotional discount."
                            : "Order validated successfully."
                    );
                    console.log(
                        "Delivery Charges Applicable:",
                        deliveryCharge > 0 ? "Yes" : "No"
                    );

                    rl.close();
                });
            });
        });
    });
});
