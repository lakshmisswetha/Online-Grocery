const updateDisplay = () => {
    const data = localStorage.getItem("cart");
    const cartItems = JSON.parse(data);
    const itemTotal = document.querySelector(".body");
    const empt = document.querySelector(".bod");
    const cartContainer = document.querySelector(".cart");

    if (cartItems && cartItems.length > 0) {
        cartContainer.innerHTML = `
  <tr>
    <th>Product</th>
    <th>Quantity</th>
    <th>Subtotal</th>
  </tr>
`;

        const cartHTML = cartItems
            .map(
                (item) => `
        <table>
    <tr class="cart-item" >
        <td class="items">
            <div class="item">
                <img src="${item.img}" id="im" alt="${item.name}" />
                <div class="info">
                    <p id="name1">${item.name}</p>
                    <div id="pr">$ ${item.price}</div>
                   <button class="de"><img src="../assets/delete.png" alt="no" class="del"></button>
                </div>
            </div>
        </td>
        <td class="qty">
            <div class="get">
                <button class="plus">+</button>
                <input class="qtyInputs" value="1"/>
                <button class="minus">-</button>
            </div>
        </td>
        <td class="subtotal"></td>
        
    </tr>
    </table> 

 
  `
            )
            .join("");
        cartContainer.innerHTML += cartHTML;

        const qtyInputs = document.querySelectorAll(".qtyInputs");
        const plusButtons = document.querySelectorAll(".plus");
        const minusButtons = document.querySelectorAll(".minus");
        const subtotalElements = document.querySelectorAll(".subtotal");
        const totprice = document.querySelector(".set");
        const dele = document.querySelectorAll(".de");

        plusButtons.forEach((button, index) => {
            button.addEventListener("click", (e) => {
                qtyInputs[index].value = parseInt(qtyInputs[index].value) + 1;
                updateSubtotal(index, cartItems[index]);
                calPrice();
            });
        });

        minusButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                if (qtyInputs[index].value > 1) {
                    qtyInputs[index].value = parseInt(qtyInputs[index].value) - 1;
                    updateSubtotal(index, cartItems[index]);
                    calPrice();
                }
            });
        });

        cartItems.forEach((item, index) => {
            updateSubtotal(index, item);
        });

        function updateSubtotal(index, item) {
            const quantity = parseInt(qtyInputs[index].value);

            const subtotal = item.price * quantity;
            subtotalElements[index].textContent = `$. ${subtotal.toFixed(2)}`;
        }
        calPrice();
        function calPrice() {
            let tot = 0;
            subtotalElements.forEach((subtotalElement) => {
                let tota = parseFloat(subtotalElement.textContent.replace("$. ", "") || 0);
                tot += tota;
            });

            if (totprice) {
                totprice.value = "$" + tot.toFixed(1);
                localStorage.setItem("totalPrice", tot.toFixed(1));
            } else {
                console.error("not found");
            }
        }

        dele.forEach((button) => {
            button.addEventListener("click", function () {
                const cartItem = button.closest(".cart-item");
                const itemNameElement = cartItem.querySelector("#name1");

                if (itemNameElement) {
                    const itemName = itemNameElement.textContent;
                    cartItem.remove();
                    updateStorage(itemName);
                    updateDisplay();
                } else {
                    console.error("Name element not found.");
                }
            });
        });

        function updateStorage(itemName) {
            const cartIte = localStorage.getItem("cart");

            if (cartIte) {
                const cartIt = JSON.parse(cartIte);
                const index = cartIt.findIndex((item) => item.name === itemName);

                if (index !== -1) {
                    cartIt.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cartIt));
                }
            }
        }
    } else {
        itemTotal.style.display = "none";
        empt.style.backgroundImage =
            "linear-gradient(315deg, #131110 30%, #57749e 50%, #131110 80%)";
        empt.style.display = "flex";
        empt.style.flex = "1";
        empt.style.alignItems = "center";
        empt.style.justifyContent = "center";

        empt.innerHTML = `
    <div class="container-fluid  mt-100">
			<div class="row">
				 
				<div class="col-md-12">
					
					<div class="card">
						
						<div class="card-body cart">
								<div style="display:flex ; align-items:center ; flex-direction:column" class="col-sm-12 empty-cart-cls text-center">
									<img src="../assets/emptyCart.png" width="130" height="130" class="img-fluid mb-4 mr-3">
									<h3><strong>Your Cart is Empty</strong></h3>
									<h4>Add something to make me happy :)</h4>
									<a href="../pages/Home.html" class="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>
									
								
								</div>
						</div>
				    </div>
						
					
					</div>
				 
				 </div>
				
			</div>
    `;
    }
};

updateDisplay();
