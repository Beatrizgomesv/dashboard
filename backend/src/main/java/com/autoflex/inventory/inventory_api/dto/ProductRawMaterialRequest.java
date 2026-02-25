package com.autoflex.inventory.inventory_api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRawMaterialRequest {

    private Long productId;
    private Long rawMaterialId;
    private Integer quantity;
}
