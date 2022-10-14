$('#btnONew').click(function () {
    clearOFields();
});
function clearOFields(){
    $('#txtOInputCustomerID').val("");
    $('#txtOOrderID').val("");
    $('#txtOOrderDate').val("");
    $('#txtOItemCOde').val("");
    $('#txtOItemName').val("");
    $('#txtOPrice').val("");
    $('#txtOQty').val("");
}

$('#btnOGetAll').click(function () {
    loadAllOrders();
});
function loadAllOrders(){
    $('#tblOrder').empty();



}