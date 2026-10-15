
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Employee ID: ", (employeeId) => {
    rl.question("Enter Total Working Days: ", (workingDaysInput) => {
        rl.question("Enter Days Present: ", (daysPresentInput) => {
            rl.question("Enter Employee Category: ", (category) => {

                const totalWorkingDays = Number(workingDaysInput);
                const daysPresent = Number(daysPresentInput);

                // Validate input
                if (
                    !employeeId.trim() ||
                    !category.trim() ||
                    !Number.isInteger(totalWorkingDays) ||
                    !Number.isInteger(daysPresent) ||
                    totalWorkingDays <= 0 ||
                    daysPresent < 0 ||
                    daysPresent > totalWorkingDays
                ) {
                    console.log("\nInvalid input. Please check the employee details.");
                    rl.close();
                    return;
                }

                // Calculate attendance percentage
                const attendancePercentage =
                    (daysPresent / totalWorkingDays) * 100;

                let incentiveStatus;
                let managementReview;
                let remarks;

                // Determine incentive eligibility
                if (attendancePercentage >= 90) {
                    incentiveStatus = "Full Attendance Incentive";
                    remarks = "Excellent Attendance";
                } else if (attendancePercentage >= 75) {
                    incentiveStatus = "Partial Attendance Incentive";
                    remarks = "Good Attendance";
                } else {
                    incentiveStatus = "No Attendance Incentive";
                    remarks = "Low Attendance";
                }

                // Management review for attendance below 60%
                managementReview =
                    attendancePercentage < 60 ? "Yes" : "No";

                if (attendancePercentage < 60) {
                    remarks = "Very Low Attendance - Management Review Required";
                }

                // Display employee report
                console.log("\n===== EMPLOYEE ATTENDANCE REPORT =====");
                console.log("Employee ID:", employeeId);
                console.log("Employee Category:", category);
                console.log("Total Working Days:", totalWorkingDays);
                console.log("Days Present:", daysPresent);
                console.log(
                    "Attendance Percentage:",
                    attendancePercentage.toFixed(2) + "%"
                );
                console.log("Incentive Status:", incentiveStatus);
                console.log("Management Review:", managementReview);
                console.log("Remarks:", remarks);

                rl.close();
            });
        });
    });
});
