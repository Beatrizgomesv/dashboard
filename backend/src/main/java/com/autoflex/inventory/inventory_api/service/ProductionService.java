package com.autoflex.inventory.inventory_api.service;

import com.autoflex.inventory.inventory_api.dto.ProductionResponse;
import com.autoflex.inventory.inventory_api.model.Product;
import com.autoflex.inventory.inventory_api.model.ProductRawMaterial;
import com.autoflex.inventory.inventory_api.repository.ProductRawMaterialRepository;
import com.autoflex.inventory.inventory_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductionService {

    private final ProductRepository productRepository;
    private final ProductRawMaterialRepository productRawMaterialRepository;

    public ProductionService(ProductRepository productRepository,
                             ProductRawMaterialRepository productRawMaterialRepository) {
        this.productRepository = productRepository;
        this.productRawMaterialRepository = productRawMaterialRepository;
    }

    public List<ProductionResponse> calculateProduction() {

        List<Product> products = new ArrayList<>(productRepository.findAll());


        products.sort((p1, p2) -> p2.getPrice().compareTo(p1.getPrice()));

        List<ProductionResponse> result = new ArrayList<>();
        Map<Long, Integer> simulatedStock = new HashMap<>();

        for (Product product : products) {

            List<ProductRawMaterial> compositions =
                    productRawMaterialRepository.findByProduct_Id(product.getId());

            if (compositions.isEmpty()) {
                continue;
            }

            int maxProduction = Integer.MAX_VALUE;

            for (ProductRawMaterial composition : compositions) {

                Long rawMaterialId = composition.getRawMaterial().getId();
                Integer requiredQuantity = composition.getRequiredQuantity();

                Integer availableStock = simulatedStock.computeIfAbsent(
                        rawMaterialId,
                        k -> composition.getRawMaterial().getStockQuantity()
                );

                int possibleProduction = availableStock / requiredQuantity;

                maxProduction = Math.min(maxProduction, possibleProduction);
            }

            if (maxProduction <= 0) {
                continue;
            }

            for (ProductRawMaterial composition : compositions) {

                Long rawMaterialId = composition.getRawMaterial().getId();
                Integer requiredQuantity = composition.getRequiredQuantity();

                Integer availableStock = simulatedStock.get(rawMaterialId);

                int consumed = requiredQuantity * maxProduction;

                simulatedStock.put(rawMaterialId, availableStock - consumed);
            }

            BigDecimal totalValue = product.getPrice()
                    .multiply(BigDecimal.valueOf(maxProduction));


            ProductionResponse response = ProductionResponse.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .quantityProduced(maxProduction)
                    .totalValue(totalValue)
                    .build();

            result.add(response);
        }

        return result;
    }
}
