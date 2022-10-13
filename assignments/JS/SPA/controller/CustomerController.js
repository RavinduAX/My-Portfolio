$('#btnCNew').click(function () {
    $('#txtCInputCustomerID').val("");
    $('#txtCCustomerName').val("");
    $('#txtCAddress').val("");
    $('#txtCContactNo').val("");
});

$('#btnCSave').click(function () {
    let customerId = $('#txtCInputCustomerID').val();
    let customerName = $('#txtCCustomerName').val();
    let customerAddress = $('#txtCAddress').val();
    let customerContact = $('#txtCContactNo').val();

    customerObj.id = customerId;
    customerObj.name = customerName;
    customerObj.address = customerAddress;
    customerObj.contact = customerContact;

    customerArr.push(customerObj);

    loadAllCustomers();


});

$('#btnCGetAll').click(function () {
    loadAllCustomers();
});

function loadAllCustomers(){
    $('#tblCustomer').empty();

    for (let customer of customerArr) {
        let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
        $('#tblCustomer').append(row);
    }

}