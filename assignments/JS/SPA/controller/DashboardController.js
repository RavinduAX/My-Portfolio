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

//----------customer details
// search_customer
$('#btnDSearch').click(function () {
    let typedN = $('#txtDInputTelNo').val();
    let customer = searchCustomer(typedN)
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
// clear_fields
$('#btnDCNew').click(function () {
    $('#txtDInputTelNo').val("");
    $('#txtDCustID').val("");
    $('#txtDInputCustName').val("");
});
function searchCustomer(contact){
    for (let customer of customerArr) {
        if(customer.contact === contact){
            return customer;
        }
    }
    return null;
}