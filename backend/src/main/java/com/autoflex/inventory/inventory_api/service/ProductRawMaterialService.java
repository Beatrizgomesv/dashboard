package com.autoflex.inventory.inventory_api.service;
import com.autoflex.inventory.inventory_api.model.Product;
import com.autoflex.inventory.inventory_api.model.ProductRawMaterial;
import com.autoflex.inventory.inventory_api.model.RawMaterial;
import com.autoflex.inventory.inventory_api.repository.ProductRawMaterialRepository;
import com.autoflex.inventory.inventory_api.repository.ProductRepository;
import com.autoflex.inventory.inventory_api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;


@Service
public class ProductRawMaterialService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductRawMaterialRepository productRawMaterialRepository;

    public ProductRawMaterialService(
            ProductRepository productRepository,
            RawMaterialRepository rawMaterialRepository,
            ProductRawMaterialRepository productRawMaterialRepository) {

        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.productRawMaterialRepository = productRawMaterialRepository;
    }

    public ProductRawMaterial associate(Long productId, Long rawMaterialId, Integer quantity) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        RawMaterial rawMaterial = rawMaterialRepository.findById(rawMaterialId)
                .orElseThrow(() -> new RuntimeException("Raw material not found"));

        ProductRawMaterial association = ProductRawMaterial.builder()
                .product(product)
                .rawMaterial(rawMaterial)
                .requiredQuantity(quantity)
                .build();

        return productRawMaterialRepository.save(association);
    }


}
