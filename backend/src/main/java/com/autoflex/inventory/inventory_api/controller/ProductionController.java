package com.autoflex.inventory.inventory_api.controller;

import com.autoflex.inventory.inventory_api.dto.ProductionResponse;
import com.autoflex.inventory.inventory_api.service.ProductionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GetMapping("/production")
    public List<ProductionResponse> calculateProduction() {
        return productionService.calculateProduction();
    }
}
