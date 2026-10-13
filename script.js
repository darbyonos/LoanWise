// ==========================================
// DOM ELEMENTS
// ==========================================

const loanForm =
    document.querySelector("#loanForm");

const loanAmount =
    document.querySelector("#loanAmount");

const interestRate =
    document.querySelector("#interestRate");

const loanDuration =
    document.querySelector("#loanDuration");

const errorMessage =
    document.querySelector("#errorMessage");

const monthlyPayment =
    document.querySelector("#monthlyPayment");

const displayLoan =
    document.querySelector("#displayLoan");

const totalInterest =
    document.querySelector("#totalInterest");

const totalPayment =
    document.querySelector("#totalPayment");

const numberOfPayments =
    document.querySelector("#numberOfPayments");


// ==========================================
// FORM SUBMISSION
// ==========================================

loanForm.addEventListener("submit", (event) => {

    // Prevent page refresh
    event.preventDefault();


    // Get values from inputs
    const amount =
        Number(loanAmount.value);

    const rate =
        Number(interestRate.value);

    const years =
        Number(loanDuration.value);


    // ======================================
    // VALIDATION
    // ======================================

    if (
        amount <= 0 ||
        rate < 0 ||
        years <= 0
    ) {

        errorMessage.textContent =
            "Please enter valid loan details.";

        return;
    }


    // Clear previous error
    errorMessage.textContent = "";


    // ======================================
    // CALCULATE LOAN
    // ======================================

    const result =
        calculateLoan(amount, rate, years);


    // ======================================
    // DISPLAY RESULTS
    // ======================================

    displayResults(
        amount,
        result
    );

});


// ==========================================
// LOAN CALCULATION FUNCTION
// ==========================================

function calculateLoan(
    amount,
    annualRate,
    years
) {

    // Convert annual interest rate
    // to a monthly decimal rate

    const monthlyRate =
        annualRate / 100 / 12;


    // Convert years to months

    const numberOfMonths =
        years * 12;


    // ======================================
    // MONTHLY PAYMENT
    // ======================================

    let monthly;


    // If interest rate is 0
    // use simple division

    if (monthlyRate === 0) {

        monthly =
            amount / numberOfMonths;

    } else {

        /*
        Standard loan payment formula:

        M = P × [r(1+r)^n] /
            [(1+r)^n - 1]

        P = loan amount
        r = monthly interest rate
        n = number of payments
        */

        monthly =
            amount *
            (
                monthlyRate *
                Math.pow(
                    1 + monthlyRate,
                    numberOfMonths
                )
            ) /
            (
                Math.pow(
                    1 + monthlyRate,
                    numberOfMonths
                ) - 1
            );
    }


    // ======================================
    // TOTAL PAYMENT
    // ======================================

    const total =
        monthly * numberOfMonths;


    // ======================================
    // TOTAL INTEREST
    // ======================================

    const interest =
        total - amount;


    // Return all calculated values
    return {

        monthly: monthly,

        total: total,

        interest: interest,

        payments: numberOfMonths

    };

}


// ==========================================
// DISPLAY RESULTS
// ==========================================

function displayResults(
    amount,
    result
) {

    monthlyPayment.textContent =
        formatCurrency(result.monthly);


    displayLoan.textContent =
        formatCurrency(amount);


    totalInterest.textContent =
        formatCurrency(result.interest);


    totalPayment.textContent =
        formatCurrency(result.total);


    numberOfPayments.textContent =
        result.payments;
}


// ==========================================
// CURRENCY FORMATTER
// ==========================================

function formatCurrency(amount) {

    return `₦${amount.toLocaleString(
        "en-NG",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;

}