public interface OrderQueryProvider {
    RequestReturnVO<OrderDetailDTO> queryDetail(String orderNo);
}
