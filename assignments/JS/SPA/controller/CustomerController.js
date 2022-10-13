$('#btnCNew').click(function () {
    clearFields();
});

$('#btnCSave').click(function () {
    saveCustomer($('#txtCInputCustomerID').val(), $('#txtCCustomerName').val(), $('#txtCAddress').val(), $('#txtCContactNo').val());

    loadAllCustomers();

    bindRowClickEvents();
});

$('#btnCGetAll').click(function () {
    loadAllCustomers();
});

function saveCustomer(id, name, address, contact){

    customerObj = new Object({
        id : id,
        name : name,
        address : address,
        contact : contact
    });

    customerArr.push(customerObj);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Customer Saved Successfully',
        showConfirmButton: false,
        timer: 1800
    })

    clearFields();
}

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

        $('#txtCInputCustomerID').val(id);
        $('#txtCCustomerName').val(name);
        $('#txtCAddress').val(address);
        $('#txtCContactNo').val(contact);
    });
}

function clearFields(){
    $('#txtCInputCustomerID').val("");
    $('#txtCCustomerName').val("");
    $('#txtCAddress').val("");
    $('#txtCContactNo').val("");
}