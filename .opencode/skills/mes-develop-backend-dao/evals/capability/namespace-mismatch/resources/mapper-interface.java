package com.example.order.dao;

public interface OrderMapper {
    OrderEntity selectByOrderNo(String orderNo);
}
