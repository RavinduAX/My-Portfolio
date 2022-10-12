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