
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Customer ID: ", (customerId) => {
    rl.question("Enter Monthly Income (Rs.): ", (incomeInput) => {
        rl.question("Enter Requested Loan Amount (Rs.): ", (loanInput) => {
            rl.question("Enter Existing Monthly EMI (Rs.): ", (emiInput) => {
                rl.question("Enter Employment Type (Salaried/Self-Employed): ", (employmentType) => {
                    rl.question("Enter Credit Score: ", (scoreInput) => {

                        const monthlyIncome = Number(incomeInput);
                        const loanAmount = Number(loanInput);
                        const existingEMI = Number(emiInput);
                        const creditScore = Number(scoreInput);
                        const employment = employmentType.trim().toLowerCase();

                        // Validate inputs
                        if (
                            !customerId.trim() ||
                            incomeInput.trim() === "" ||
                            loanInput.trim() === "" ||
                            emiInput.trim() === "" ||
                            scoreInput.trim() === "" ||
                            !Number.isFinite(monthlyIncome) ||
                            !Number.isFinite(loanAmount) ||
                            !Number.isFinite(existingEMI) ||
                            !Number.isFinite(creditScore) ||
                            monthlyIncome <= 0 ||
                            loanAmount <= 0 ||
                            existingEMI < 0 ||
                            !Number.isInteger(creditScore) ||
                            creditScore < 300 ||
                            creditScore > 900
                        ) {
                            console.log("\nInvalid input. Please enter valid customer details.");
                            rl.close();
                            return;
                        }

                        if (!["salaried", "self-employed"].includes(employment)) {
                            console.log("\nInvalid employment type.");
                            rl.close();
                            return;
                        }

                        let loanEligibility = "Not Eligible";
                        let eligibilityCategory = "None";
                        let remarks = "";

                        // Existing EMI should not exceed 50% of monthly income
                        const emiRatio = (existingEMI / monthlyIncome) * 100;
                        const emiWithinLimit = emiRatio <= 50;

                        // Evaluate eligibility
                        if (!emiWithinLimit) {
                            remarks = "Existing EMI exceeds 50% of monthly income.";
                        } else if (
                            employment === "salaried" &&
                            creditScore >= 750 &&
                            monthlyIncome >= 30000
                        ) {
                            loanEligibility = "May Be Eligible";
                            eligibilityCategory = "Standard";
                            remarks = "Meets preliminary standard category criteria.";
                        } else if (creditScore >= 650 && creditScore <= 749) {
                            loanEligibility = "May Be Eligible";
                            eligibilityCategory = "Restricted";
                            remarks = "Meets preliminary restricted category credit criteria.";
                        } else {
                            remarks = "Minimum eligibility requirements are not satisfied.";
                        }

                        // Display report
                        console.log("\n===== LOAN ELIGIBILITY REPORT =====");
                        console.log("Customer ID:", customerId);
                        console.log("Employment Type:", employmentType);
                        console.log("Monthly Income: Rs.", monthlyIncome.toFixed(2));
                        console.log("Requested Loan Amount: Rs.", loanAmount.toFixed(2));
                        console.log("Credit Score:", creditScore);
                        console.log("Existing EMI: Rs.", existingEMI.toFixed(2));
                        console.log("Existing EMI Burden:", emiRatio.toFixed(2) + "%");
                        console.log("Loan Eligibility:", loanEligibility);
                        console.log("Eligibility Category:", eligibilityCategory);
                        console.log("Remarks:", remarks);
                        console.log("\nNote: This is a preliminary assessment, not a loan approval.");

                        rl.close();
                    });
                });
            });
        });
    });
});
