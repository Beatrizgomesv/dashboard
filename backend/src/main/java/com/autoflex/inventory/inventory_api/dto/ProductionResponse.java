package com.autoflex.inventory.inventory_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
public class ProductionResponse {

    private Long productId;
    private String productName;
    private Integer quantityProduced;
    private BigDecimal totalValue;
}
