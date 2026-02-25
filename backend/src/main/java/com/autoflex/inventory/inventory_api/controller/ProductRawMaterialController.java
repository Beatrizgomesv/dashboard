package com.autoflex.inventory.inventory_api.controller;

import com.autoflex.inventory.inventory_api.dto.ProductRawMaterialRequest;
import com.autoflex.inventory.inventory_api.model.ProductRawMaterial;
import com.autoflex.inventory.inventory_api.service.ProductRawMaterialService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product-compositions")
public class ProductRawMaterialController {

    private final ProductRawMaterialService productRawMaterialService;

    public ProductRawMaterialController(ProductRawMaterialService productRawMaterialService) {
        this.productRawMaterialService = productRawMaterialService;
    }

    @PostMapping
    public ProductRawMaterial associate(@RequestBody ProductRawMaterialRequest request) {
        return productRawMaterialService.associate(
                request.getProductId(),
                request.getRawMaterialId(),
                request.getQuantity()
        );
    }

}

