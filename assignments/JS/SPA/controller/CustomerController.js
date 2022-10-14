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

//RegEx
$('#txtCInputCustomerID').focus();

const cusIDRegEx = /^(C)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusContactRegEx = /^[0-9]{10}$/;

let customerValidations = [];
customerValidations.push({reg: cusIDRegEx, field: $('#txtCInputCustomerID'),error:'Customer ID Pattern is Wrong : C001'});
customerValidations.push({reg: cusNameRegEx, field: $('#txtCCustomerName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidations.push({reg: cusAddressRegEx, field: $('#txtCAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidations.push({reg: cusContactRegEx, field: $('#txtCContactNo'),error:'Customer Contact Pattern is Wrong : [0-9] 10 Numbers'});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtCInputCustomerID,#txtCCustomerName,#txtCAddress,#txtCContactNo").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtCInputCustomerID,#txtCCustomerName,#txtCAddress,#txtCContactNo").on('keyup', function (event) {
    checkValidity();
});
$("#txtCInputCustomerID,#txtCCustomerName,#txtCAddress,#txtCContactNo").on('blur', function (event) {
    checkValidity();
});

$("#txtCInputCustomerID").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusIDRegEx, $("#txtCInputCustomerID"))) {
        $("#txtCCustomerName").focus();
    } else {
        focusText($("#txtCInputCustomerID"));
    }
});

$("#txtCCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#txtCCustomerName"))) {
        focusText($("#txtCAddress"));
    }
});

$("#txtCAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txtCAddress"))) {
        focusText($("#txtCContactNo"));
    }
});

$("#txtCContactNo").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusContactRegEx, $("#txtCContactNo"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            clearAllTexts();
        }
    }
});

function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
        txtField.parent().children('span').css('font-size','12px');
        txtField.parent().children('span').css('color','red');
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#btnCSave").attr('disabled',true);
    }else{
        $("#btnCSave").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtCInputCustomerID").focus();
    $("#txtCInputCustomerID,#txtCCustomerName,#txtCAddress,#txtCContactNo").val("");
    checkValidity();
}
