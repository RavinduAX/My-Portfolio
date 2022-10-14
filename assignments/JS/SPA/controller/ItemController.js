$('#btnINew').click(function () {
    clearIFields();
    bindIRowClickEvents();
});

$('#btnISave').click(function () {
    saveItem($('#txtIInputItemCode').val(), $('#txtIInputItemName').val(), $('#txtIInputPrice').val(), $('#txtIInputQty').val());

    loadAllItems();

    bindIRowClickEvents();
});

$('#btnIGetAll').click(function () {
    loadAllItems();
    bindIRowClickEvents();
});

$('#btnIDelete').click(function () {
    let deletedCode = $('#txtIInputItemCode').val();
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete "+ deletedCode +" Item ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            if(deleteItem(deletedCode)){
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                clearIFields();
            }else{
                Swal.fire(
                    'Error',
                    'NO customer to delete, Re-Check customer ID',
                    'error'
                )
                clearIFields();
            }
        }
    })
});

$('#btnISearch').click(function () {
    let typedCode = $('#txtIInputItemCode').val();
    let item = searchItem(typedCode);
    if(item != null){
        setITextFieldValues(item.name, item.price, item.qty);
    }else{
        Swal.fire(
            'Error',
            'There is no Item available for ' + typedCode,
            'error'
        )
        setITextFieldValues("", "", "");
    }
});

$('#btnIUpdate').click(function () {
    let updatedCode = $('#txtIInputItemCode').val();
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            if(updateItem(updatedCode)){
                Swal.fire(
                    'Updated!',
                    'Item updated successfully.',
                    'success'
                )
                clearIFields();
            }else{
                Swal.fire(
                    'Error',
                    'NO Item to update, Re-Check Item Code',
                    'error'
                )
                clearIFields();
            }
        }
    })
});

function saveItem(code, name, price, qty){

    itemObj = new Object({
        code : code,
        name : name,
        price : price,
        qty : qty
    });

    itemArr.push(itemObj);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Saved Successfully',
        showConfirmButton: false,
        timer: 1800
    })

    clearIFields();
}

function deleteItem(code){
    let item = searchItem(code);
    if(item != null){
        let indexNo = itemArr.indexOf(item);
        itemArr.splice(indexNo,1);
        loadAllItems();
        bindIRowClickEvents();
        return true;
    }else{
        return false;
    }
}

function searchItem(code){
    for (let item of itemArr) {
        if(item.code == code){
            bindIRowClickEvents();
            return item;
        }
    }
    return null;
}

function updateItem(code){
    let item = searchItem(code);
    if(item != null){
        item.name = $('#txtIInputItemName').val();
        item.price = $('#txtIInputPrice').val();
        item.qty = $('#txtIInputQty').val();
        loadAllItems();
        bindIRowClickEvents();
        return true;
    }else {
        return false;
    }
}

function loadAllItems(){
    $('#tblItem').empty();

    for (let item of itemArr) {
        let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
        $('#tblItem').append(row);
    }

}

function bindIRowClickEvents() {
    $('#tblItem>tr').click(function () {
        let code = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let price = $(this).children(':eq(2)').text();
        let qty = $(this).children(':eq(3)').text();

        $('#txtIInputItemCode').val(code);
        $('#txtIInputItemName').val(name);
        $('#txtIInputPrice').val(price);
        $('#txtIInputQty').val(qty);
    });
}

function setITextFieldValues(name, price, qty){
    $('#txtIInputItemName').val(name);
    $('#txtIInputPrice').val(price);
    $('#txtIInputQty').val(qty);
}

function clearIFields(){
    $('#txtIInputItemCode').val("");
    $('#txtIInputItemName').val("");
    $('#txtIInputPrice').val("");
    $('#txtIInputQty').val("");
}

//RegEx
$('#txtIInputItemCode').focus();

const itemCodeRegEx = /^(I)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{1,20}$/;
const itemPriceRegEx = /^[0-9]{1,6}$/;
const itemQtyRegEx = /^[0-9]{1,4}$/;

let itemValidations = [];
itemValidations.push({reg: itemCodeRegEx, field: $('#txtIInputItemCode'),error:'Item Code Pattern is Wrong : I001'});
itemValidations.push({reg: itemNameRegEx, field: $('#txtIInputItemName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
itemValidations.push({reg: itemPriceRegEx, field: $('#txtIInputPrice'),error:'Item Price Pattern is Wrong : 0-9'});
itemValidations.push({reg: itemQtyRegEx, field: $('#txtIInputQty'),error:'Item Qty Pattern is Wrong : [0-9]  max : 4 Numbers'});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtIInputItemCode,#txtIInputItemName,#txtIInputPrice,#txtIInputQty").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtIInputItemCode,#txtIInputItemName,#txtIInputPrice,#txtIInputQty").on('keyup', function (event) {
    checkValidity();
});
$("#txtIInputItemCode,#txtIInputItemName,#txtIInputPrice,#txtIInputQty").on('blur', function (event) {
    checkValidity();
});

$("#txtIInputItemCode").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemCodeRegEx, $("#txtIInputItemCode"))) {
        $("#txtIInputItemName").focus();
    } else {
        focusText($("#txtIInputItemCode"));
    }
});

$("#txtIInputItemName").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameRegEx, $("#txtIInputItemName"))) {
        focusText($("#txtIInputPrice"));
    }
});

$("#txtIInputPrice").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemPriceRegEx, $("#txtIInputPrice"))) {
        focusText($("#txtIInputQty"));
    }
});

$("#txtIInputQty").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQtyRegEx, $("#txtIInputQty"))) {
        let res = confirm("Do you want to add this Item.?");
        if (res) {
            clearAllTexts();
        }
    }
});

function checkValidity() {
    let errorCount=0;
    for (let validation of itemValidations) {
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
        $("#btnISave").attr('disabled',true);
    }else{
        $("#btnISave").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtIInputItemCode").focus();
    $("#txtIInputItemCode,#txtIInputItemName,#txtIInputPrice,#txtIInputQty").val("");
    checkValidity();
}