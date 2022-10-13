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

    bindRowClickEvents();
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

function bindRowClickEvents() {
    $('#tblCustomer>tr').click(function () {
        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let contact = $(this).children(':eq(3)').text();

        $('#txtCInputCustomerID').text(id);
        $('#txtCCustomerName').text(name);
        $('#txtCAddress').text(address);
        $('#txtCContactNo').text(contact);
    });
}