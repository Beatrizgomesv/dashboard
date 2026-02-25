package com.autoflex.inventory.inventory_api.repository;

import com.autoflex.inventory.inventory_api.model.ProductRawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRawMaterialRepository
        extends JpaRepository<ProductRawMaterial, Long> {

    List<ProductRawMaterial> findByProduct_Id(Long productId);
}
