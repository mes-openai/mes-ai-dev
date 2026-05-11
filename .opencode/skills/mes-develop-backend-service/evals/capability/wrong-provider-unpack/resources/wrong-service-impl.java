public OrderDetailVO getOrderDetail(String orderNo) {
    OrderDetailDTO dto = orderQueryProvider.queryDetail(orderNo).getData();
    return OrderConverter.INSTANCE.toVO(dto);
}
