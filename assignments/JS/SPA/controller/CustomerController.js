$('#btnCNew').click(function () {
    clearCFields();
    bindCRowClickEvents();
});

$('#btnCSave').click(function () {
    saveCustomer($('#txtCInputCustomerID').val(), $('#txtCCustomerName').val(), $('#txtCAddress').val(), $('#txtCContactNo').val());

    loadAllCustomers();

    bindCRowClickEvents();
});

$('#btnCGetAll').click(function () {
    loadAllCustomers();
    bindCRowClickEvents();
});

$('#btnCDelete').click(function () {
    let deletedID = $('#txtCInputCustomerID').val();
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete "+ deletedID +" Customer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            if(deleteCustomer(deletedID)){
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                clearCFields();
            }else{
                Swal.fire(
                    'Error',
                    'NO customer to delete, Re-Check customer ID',
                    'error'
                )
                clearCFields();
            }
        }
    })
});

$('#btnCSearch').click(function () {
    let typedID = $('#txtCInputCustomerID').val();
    let customer = searchCustomer(typedID);
    if(customer != null){
        setCTextFieldValues(customer.name, customer.address, customer.contact);
    }else{
        Swal.fire(
            'Error',
            'There is no customer available for ' + typedID,
            'error'
        )
        setCTextFieldValues("", "", "", "");
    }
});

$('#btnCUpdate').click(function () {
    let updatedID = $('#txtCInputCustomerID').val();
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            if(updateCustomer(updatedID)){
                Swal.fire(
                    'Updated!',
                    'Customer updated successfully.',
                    'success'
                )
                clearCFields();
            }else{
                Swal.fire(
                    'Error',
                    'NO customer to update, Re-Check customer ID',
                    'error'
                )
                clearCFields();
            }
        }
    })

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

    clearCFields();
}

function deleteCustomer(id){
    let customer = searchCustomer(id);
    if(customer != null){
        let indexNo = customerArr.indexOf(customer);
        customerArr.splice(indexNo,1);
        loadAllCustomers();
        bindCRowClickEvents();
        return true;
    }else{
        return false;
    }
}

function searchCustomer(id){
    for (let customer of customerArr) {
        if(customer.id == id){
            bindCRowClickEvents();
            return customer;
        }
    }
    return null;
}

function updateCustomer(id){
    let customer = searchCustomer(id);
    if(customer != null){
        customer.name = $('#txtCCustomerName').val();
        customer.address = $('#txtCAddress').val();
        customer.contact = $('#txtCContactNo').val();
        loadAllCustomers();
        bindCRowClickEvents();
        return true;
    }else {
        return false;
    }
}

function loadAllCustomers(){
    $('#tblCustomer').empty();

    for (let customer of customerArr) {
        let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
        $('#tblCustomer').append(row);
    }

}

function bindCRowClickEvents() {
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

function setCTextFieldValues(name, address, contact){
    $('#txtCCustomerName').val(name);
    $('#txtCAddress').val(address);
    $('#txtCContactNo').val(contact);
}

function clearCFields(){
    $('#txtCInputCustomerID').val("");
    $('#txtCCustomerName').val("");
    $('#txtCAddress').val("");
    $('#txtCContactNo').val("");
}