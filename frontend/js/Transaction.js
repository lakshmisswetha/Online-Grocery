document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const cardNumberInput = document.getElementById("card-number");
    const cvvInput = document.getElementById("cvv");
    const confirmButton = document.querySelector('button[type="submit"]');
    const upiBlock = document.querySelector(".upi");
    const upi = document.querySelector("#upi");
    const credit = document.querySelector(".credit-card");
    const creditCard = document.querySelector("#credit-card");
    const debitcard = document.querySelector("#debit-card");
    const upiIdInput = document.querySelector("#upi-id");
    const tot = document.querySelector("#tot");
    const totalPrice = localStorage.getItem("totalPrice");
    const totalAmt = document.querySelector("#total");
    const dis = document.getElementById("dis");
    const apply = document.querySelector(".apply");
    const payment = document.querySelector(".payment-container");
    var discount = 0;
    tot.textContent = `$${totalPrice}`;
    dis.textContent = `$${discount}`;
    let total = totalPrice - discount + 1.2 + 0.9;
    totalAmt.textContent = `$${total.toFixed(2)}`;

    apply.addEventListener("click", () => {
        discount = 2.4;
        dis.textContent = `-$${discount}`;
        total = totalPrice - discount + 1.2 + 0.9;
        totalAmt.textContent = `$${total.toFixed(2)}`;
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!emailInput.value.endsWith("@gmail.com")) {
            alert("Please enter a valid email address.");
            return;
        }

        //  if (discountInput.value.trim() !== '') {
        //     discountInvalidMsg.style.display = 'block';
        //     discountInput.value = '';
        // } else {
        //     discountInvalidMsg.style.display = 'none';
        // }

        if (creditCard.checked || debitcard.checked) {
            if (!/^\d{16}$/.test(cardNumberInput.value)) {
                alert("Card number must be 16 digits.");
                return;
            }

            if (!/^\d{3}$/.test(cvvInput.value)) {
                alert("CVV must be 3 digits.");
                return;
            }
        } else if (upi.checked) {
            if (!upiIdInput.value.includes("@")) {
                alert("Please enter a valid UPI ID .");
                return;
            }
        }
        payment.style.filter = "blur(7px)";

        displayInvoice();
    });

    function displayInvoice() {
        const invoiceModal = document.createElement("div");
        invoiceModal.classList.add("invoice");
        invoiceModal.style.position = "fixed";
        invoiceModal.style.top = "50%";
        invoiceModal.style.left = "50%";
        invoiceModal.style.transform = "translate(-50%, -50%)";
        invoiceModal.style.backgroundColor = "#fff";
        invoiceModal.style.padding = "20px";
        invoiceModal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        invoiceModal.style.borderRadius = "5px";
        invoiceModal.style.zIndex = "1000";
        invoiceModal.style.width = "80%";
        invoiceModal.style.maxWidth = "600px";

        const transactionId = "TX" + Math.floor(Math.random() * 1000000);
        const customerId = "CU" + Math.floor(Math.random() * 1000000);
        const productIds = ["PID123", "PID456"];
        const totalAmount = total.toFixed(2);
        const noOfItems = 2;

        invoiceModal.innerHTML = `
            <h3>Invoice</h3>
            <p>Transaction ID: ${transactionId}</p>
            <p>Customer ID: ${customerId}</p>
            <p>Product IDs: ${productIds.join(", ")}</p>
            <p>Total Amount: ${totalAmount}</p>
            <p>Number of Items: ${noOfItems}</p>
            <button onclick="this.parentElement.style.display='none';location.reload()">Close</button>
        `;

        document.body.appendChild(invoiceModal);
    }

    upi.addEventListener("click", () => {
        credit.style.display = "none";
        upiBlock.style.display = "block";
    });
    creditCard.addEventListener("click", () => {
        upiBlock.style.display = "none";
        credit.style.display = "block";
    });
    debitcard.addEventListener("click", () => {
        upiBlock.style.display = "none";
        credit.style.display = "block";
    });
});
