package com.autoflex.inventory.inventory_api.service;

import com.autoflex.inventory.inventory_api.model.Product;
import com.autoflex.inventory.inventory_api.model.ProductRawMaterial;
import com.autoflex.inventory.inventory_api.model.RawMaterial;
import com.autoflex.inventory.inventory_api.repository.ProductRawMaterialRepository;
import com.autoflex.inventory.inventory_api.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class ProductionServiceTest {

    private ProductRepository productRepository;
    private ProductRawMaterialRepository productRawMaterialRepository;
    private ProductionService productionService;

    @BeforeEach
    void setup() {
        productRepository = Mockito.mock(ProductRepository.class);
        productRawMaterialRepository = Mockito.mock(ProductRawMaterialRepository.class);
        productionService = new ProductionService(productRepository, productRawMaterialRepository);
    }

    @Test
    void shouldCalculateProductionCorrectly() {

        Product product = new Product();
        product.setId(1L);
        product.setName("ProdutoTeste");
        product.setPrice(BigDecimal.valueOf(100));

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("MaterialTeste");
        rawMaterial.setStockQuantity(10);

        ProductRawMaterial composition = new ProductRawMaterial();
        composition.setProduct(product);
        composition.setRawMaterial(rawMaterial);
        composition.setRequiredQuantity(2);

        when(productRepository.findAll()).thenReturn(List.of(product));
        when(productRawMaterialRepository.findByProduct_Id(1L))
                .thenReturn(List.of(composition));

        var result = productionService.calculateProduction();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getQuantityProduced()).isEqualTo(5);
    }

    @Test
    void shouldPrioritizeHigherPriceProduct() {

        Product cheap = new Product();
        cheap.setId(1L);
        cheap.setName("Cheap");
        cheap.setPrice(BigDecimal.valueOf(100));

        Product expensive = new Product();
        expensive.setId(2L);
        expensive.setName("Expensive");
        expensive.setPrice(BigDecimal.valueOf(300));

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("Material");
        rawMaterial.setStockQuantity(10);

        ProductRawMaterial cheapComposition = new ProductRawMaterial();
        cheapComposition.setProduct(cheap);
        cheapComposition.setRawMaterial(rawMaterial);
        cheapComposition.setRequiredQuantity(2);

        ProductRawMaterial expensiveComposition = new ProductRawMaterial();
        expensiveComposition.setProduct(expensive);
        expensiveComposition.setRawMaterial(rawMaterial);
        expensiveComposition.setRequiredQuantity(2);

        // Mock dos produtos (ordem propositalmente invertida)
        when(productRepository.findAll())
                .thenReturn(new ArrayList<>(List.of(cheap, expensive)));

        when(productRawMaterialRepository.findByProduct_Id(1L))
                .thenReturn(List.of(cheapComposition));

        when(productRawMaterialRepository.findByProduct_Id(2L))
                .thenReturn(List.of(expensiveComposition));

        var result = productionService.calculateProduction();

        // Deve produzir apenas o produto mais caro
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getProductName()).isEqualTo("Expensive");
        assertThat(result.get(0).getQuantityProduced()).isEqualTo(5);
    }
    @Test
    void shouldReturnEmptyWhenNotEnoughStock() {

        Product product = new Product();
        product.setId(1L);
        product.setName("ProdutoTeste");
        product.setPrice(BigDecimal.valueOf(100));

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("MaterialTeste");
        rawMaterial.setStockQuantity(1); // menor que required

        ProductRawMaterial composition = new ProductRawMaterial();
        composition.setProduct(product);
        composition.setRawMaterial(rawMaterial);
        composition.setRequiredQuantity(2);

        when(productRepository.findAll())
                .thenReturn(new ArrayList<>(List.of(product)));

        when(productRawMaterialRepository.findByProduct_Id(1L))
                .thenReturn(List.of(composition));

        var result = productionService.calculateProduction();

        assertThat(result).isEmpty();
    }


}
