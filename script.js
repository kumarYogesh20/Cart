// api url
const api_url = 
    "https://dummyjson.com/carts";
// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    // console.log("data",data);
    show(data);

    const plusBtn = document.querySelectorAll(".btn-qty-plus");
    const minusBtn = document.querySelectorAll('.btn-qty-minus');
    const itemNo = document.querySelectorAll('.ItemNo') ;
    const inputQty = document.querySelectorAll('.qty');
    let shippingSelect = document.getElementById('shipping');
    let delPromo = document.querySelector("#del-promo");
   
    // qunatity input value function
    inputQty.forEach((iqty) => { 
        iqty.addEventListener('input', (e)=>{
            if(e.target.value === "0" ){
                e.target.value = 1;
            }
            updateAmounts()
        });
        iqty.addEventListener('blur', (e)=>{
            if(e.target.value === "" ){
                e.target.value=1;
            }
            updateAmounts()
        })
        
    })

    let cartMessage = `<div id="message-block">
    <div class="empty-img">
        <img src="img/empty_cart.gif" alt="Cart_Img">
    </div>
    <div class="empty_message">
        <p>Your Cart is Currently Empty!</p>
        <a href="javascript:void(0);" class="shopping-btn">Continue Shopping</a>
    </div>
</div>`
    
    function updateAmounts() {
        let sum = 0.0;
        let rows = document.querySelectorAll('table > tbody > tr');
        rows.forEach(function (row) {
            let qty = (row.querySelector('.qty').value);
            let price = parseFloat(row.querySelector('.price').value);
            let amount = qty * price;
            sum += amount;
            row.querySelector('.amount').innerHTML = '' + amount;
        });
    
        let item = rows.length;
        // show how many item is present
        
        itemNo.forEach((items) =>{
            items.innerHTML = item;
        })
   
        document.querySelector('.total').innerHTML =  sum ;
        totalCost = sum > 0 ? sum + parseInt(shippingSelect.value) : 0;
        document.querySelector('.total-cost-bill').innerHTML = totalCost;
        
        // on change Shipping 
        shippingSelect.addEventListener('change', function () {
            let optionValue = parseInt(this.value);
            totalCost = sum > 0 ? sum + optionValue : 0;
            document.querySelector('.total-cost-bill').innerHTML = totalCost;

            let code = promoCode.value.toLowerCase();
            if (code === 'diwali2020') {
                let includePromoCode = totalCost - (totalCost * 0.2);
                document.querySelector('.total-cost-bill').innerHTML = Math.round(includePromoCode);
            } else if (code === 'newuser') {
                let includePromoCode = totalCost - (totalCost * 0.1);
                document.querySelector('.total-cost-bill').innerHTML = Math.round(includePromoCode);
            }else{
                document.querySelector('.total-cost-bill').innerHTML = totalCost;
            }
        })
        
        if(item === 0){
            document.querySelector("thead").innerHTML = "";
           document.querySelector("#cartMessage").innerHTML = cartMessage;
           shippingSelect.setAttribute("disabled", "true")
        } 
    }
    updateAmounts()

    // Increase the value in Quantity
    plusBtn.forEach((plus,i )=>{
        plus.addEventListener('click',function (){
            let n = this.parentNode.querySelector(".qty");
            n.value = Number(n.value) + 1
            if(n.value > 1){
               minusBtn[i].removeAttribute("disabled")
            }
        updateAmounts()
        })
    })

    // Decrease the value in Quantity
    minusBtn.forEach((minus)=>{
        minus.addEventListener('click',function (e){
            let n = this.parentNode.querySelector(".qty");
            let qtyVal = Number(n.value);
            if (qtyVal > 1) {
                n.value = qtyVal - 1;
            }
            if(qtyVal <= 1){
                e.target.setAttribute("disabled", "true");
            }
            updateAmounts()
        });
       
    });

    // Delete the product on button click
    let removeItem = document.querySelectorAll('.btn-danger'); 
    removeItem.forEach((del) => {
        del.addEventListener('click', (event) =>{
            let buttonCLicked = event.target
            buttonCLicked.parentElement.parentElement.remove();
            updateAmounts();
        })
    });
    
    // on change Shipping 
    
    // on Promo Code 
    let applyCodeBtn = document.getElementById('ApplyCode');
    let promoCode = document.getElementById('promoCode');
    let promoBlock = document.querySelector(".promo-block")

    promoCode.addEventListener('keydown',() =>{
        if(promoCode.value.length <=1 ){
            applyCodeBtn.setAttribute("disabled", "true")
            delPromo.style.display = "none" 

        }else if(promoCode.value.length === ""){
            delPromo.style.display = "none" ;
        }
        else{
            applyCodeBtn.removeAttribute("disabled");
            delPromo.style.display = "block"; 
        }
    });
    // promoCode.addEventListener('blur',() =>{
    //     if(promoCode.value.length <=1 ){
    //         applyCodeBtn.setAttribute("disabled", "true");
    //         document.getElementById('promoMessage').innerHTML = " ";
    //         delPromo.style.display = "none"; 
    //     }
    // });

    promoBlock.addEventListener('blur', () => {
        if(promoCode.value.length <=1 ){
            applyCodeBtn.setAttribute("disabled", "true");
            document.getElementById('promoMessage').innerHTML = " ";
            delPromo.style.display = "none"; 
        }
    })
        
    applyCodeBtn.addEventListener('click', function () {
        updateAmounts();
        let code = promoCode.value.toLowerCase();
        if(totalCost === 0){
            document.getElementById('promoMessage').innerHTML = "There is no product in cart";
            document.getElementById('promoMessage').style.color = "red";
        }else if (code === 'diwali2020') {
            let includePromoCode = totalCost - (totalCost * 0.2);
            document.getElementById('promoMessage').innerHTML = "Hey you get 20% Discount";
            document.querySelector('.total-cost-bill').innerHTML = Math.round(includePromoCode);
            document.getElementById('promoMessage').style.color = "rgb(30, 255, 0)";
        } else if (code === 'newuser') {
            let includePromoCode = totalCost - (totalCost * 0.1);
            document.getElementById('promoMessage').innerHTML = "Hey you get 10% Discount";
            document.querySelector('.total-cost-bill').innerHTML = Math.round(includePromoCode);
            document.getElementById('promoMessage').style.color = "rgb(30, 255, 0)";
        } else {
            document.getElementById('promoMessage').innerHTML = "Invalid Code";
            document.getElementById('promoMessage').style.color = "red";
        }
    });

    // delete value from promo input box
    // let delPromo = document.querySelector("#del-promo");
    delPromo.addEventListener("click", () => {
       promoCode.value = " ";
       let includePromoCode = totalCost 
       document.getElementById('promoMessage').innerHTML = " ";
       document.querySelector('.total-cost-bill').innerHTML = Math.round(includePromoCode);  
       applyCodeBtn.setAttribute("disabled", "true");
    })
}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    const product = data.carts[2].products;
    let tab = `<tr>
        <th>Product Title</th>
        <th>Quantity</th>
        <th>Price</th>
        <th><span id="productTotal">Total</span></th>
    </tr>
    `
    //map
    let tbody= '';
    product.map(data =>{
         tbody += ` <tr>
        <td class="ptitle">
            ${data.title}
        </td>
        <td>
            <div class="btn-container">
                <button class="btn-qty-minus fa-solid fa-minus"></button>
                <input type="text" name="qty" value="${data.quantity}" class="qty" min="0" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" max="50">
                <button class="btn-qty-plus fa-solid fa-plus"></button>
            </div>
        </td>
        <td><input type="text" value="${data.price}" class="price form-control" disabled></td>
        <td>&#8377; <span class="amount">${data.price * data.quantity}</span></td>
        <td><btn class="btn btn-danger fa-solid fa-trash"></button></td>
        </tr>`;
    })

    // Setting innerHTML as tab variable
    document.querySelector("thead").innerHTML = tab;
    document.querySelector("tbody").innerHTML = tbody;
}