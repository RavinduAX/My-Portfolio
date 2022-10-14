// SPA configuration
$('#secDash').css('display','block');
$('#secCust').css('display','none');
$('#secItem').css('display','none');
$('#secOrder').css('display','none');

$('#navBtnDashboard').click(function (){
    $('#secDash').css('display','block');
    $('#secCust').css('display','none');
    $('#secItem').css('display','none');
    $('#secOrder').css('display','none');
});
$('#navBtnCustomer').click(function (){
    $('#secDash').css('display','none');
    $('#secCust').css('display','block');
    $('#secItem').css('display','none');
    $('#secOrder').css('display','none');
});
$('#navBtnItem').click(function (){
    $('#secDash').css('display','none');
    $('#secCust').css('display','none');
    $('#secItem').css('display','block');
    $('#secOrder').css('display','none');
});
$('#navBtnOrder').click(function (){
    $('#secDash').css('display','none');
    $('#secCust').css('display','none');
    $('#secItem').css('display','none');
    $('#secOrder').css('display','block');
});

/*----------customer details*/
// search-customer
$('#btnDCSearch').click(function () {
    let typedN = $('#txtDInputTelNo').val();
    let customer = searchDCustomer(typedN);
    if(customer != null){
        $('#txtDCustID').val(customer.id);
        $('#txtDInputCustName').val(customer.name);
    }else{
        Swal.fire(
            'Error',
            'There is no customer available for ' + typedN,
            'error'
        )
    }
});
// clear-fields
$('#btnDCNew').click(function () {
    $('#txtDInputTelNo').val("");
    $('#txtDCustID').val("");
    $('#txtDInputCustName').val("");
});

function searchDCustomer(contact){
    for (let customer of customerArr) {
        if(customer.contact === contact){
            return customer;
        }
    }
    return null;
}

/*----------purchase details*/
//search-item
$('#btnDISearch').click(function () {
    let typedCode = $('#txtDInputItemCode').val();
    let item = searchItem(typedCode);
    if(item != null){
        $('#txtDItemName').val(item.name);
        $('#txtDPrice').val(item.price);
        $('#txtDQtyOnHand').val(item.qty);
    }else{
        Swal.fire(
            'Error',
            'There is no Item available for ' + typedCode,
            'error'
        )
    }
});
//clear-fields
$('#btnDINew').click(function () {
    $('#txtDInputItemCode').val("");
    $('#txtDItemName').val("");
    $('#txtDPrice').val("");
    $('#txtDQtyOnHand').val("");
    $('#txtDInputOrderQty').val("");
});
//add-items
let dTotal = 0;
$('#btnDIAddItem').click(function () {
    let orderId = $('#txtDOrderID').val();
    let customerId = $('#txtDCustID').val();
    let itemCode = $('#txtDInputItemCode').val();
    let price = $('#txtDPrice').val();
    let qty = $('#txtDInputOrderQty').val();
    let total = price * qty;
    let subTotal = ""
    let orderDate = $('#txtDDateTime').val();
    let itemName = $('#txtDItemName').val();

    dTotal = dTotal + total;
    $('#txtTotal').val(dTotal);

    addToCart(orderId,customerId,itemCode,price,qty,total,subTotal,orderDate,itemName);

    loadToTable();
});
function addToCart(orderId,customerId,itemCode,price,qty,total,subTotal,orderDate,itemName){
    placeOrderObj = new Object({
        oId : orderId,
        cId : customerId,
        iCode : itemCode,
        price : price,
        qty : qty,
        total : total,
        subTotal : subTotal,
        oDate : orderDate,
        iName : itemName
    });

    placeOrderArr.push(placeOrderObj);

    $('#txtDInputItemCode').val("");
    $('#txtDItemName').val("");
    $('#txtDPrice').val("");
    $('#txtDQtyOnHand').val("");
    $('#txtDInputOrderQty').val("");

}
function loadToTable(){
    $('#tblPurchaseOrder').empty();

    for (let pOrder of placeOrderArr) {
        let row = `<tr><td>${pOrder.iCode}</td><td>${pOrder.iName}</td><td>${pOrder.price}</td><td>${pOrder.qty}</td><td>${pOrder.total}</td></tr>`;
        $('#tblPurchaseOrder').append(row);
    }
}
//make bill calculations
$('#btnPurchase').click(function () {
    let total = $('#txtTotal').val();
    let cash = $('#txtInputCash').val();
    let discount = $('#txtInputDiscount').val();

    let subTotal = calculateSubTotal(total,discount);
    $('#txtSubTotal').val(subTotal);

    let balance = calculateBalance(cash, subTotal);
    $('#txtBalance').val(balance);

    //send full order data to orderArray
    let tempArr = [];
    tempArr = placeOrderArr.slice();
    orderObj = new Object({
        po : tempArr
    });
    orderArr.push(orderObj);
    console.log(orderArr);
});
function calculateSubTotal(total,discount){
    let tempDis = total * (discount/100);
    let subTotal = total-tempDis;
    return subTotal;
}
function calculateBalance(cash, subTotal){
    let balance = cash - subTotal;
    return balance;
}

$('#btnDone').click(function () {
    $('#txtDInputTelNo').val("");
    $('#txtDCustID').val("");
    $('#txtDInputCustName').val("");

    $('#txtDInputItemCode').val("");
    $('#txtDItemName').val("");
    $('#txtDPrice').val("");
    $('#txtDQtyOnHand').val("");
    $('#txtDInputOrderQty').val("");

    $('#txtTotal').val("");
    $('#txtInputCash').val("");
    $('#txtInputDiscount').val("");
    $('#txtSubTotal').val("");
    $('#txtBalance').val("");

    //reset array after one purchase
    while(placeOrderArr.length > 0) {
        placeOrderArr.pop();
    }
    dTotal=0;
    $('#tblPurchaseOrder').empty();

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Purchase Placed Successfully !',
        showConfirmButton: false,
        timer: 1800
    })

});
