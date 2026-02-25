package com.autoflex.inventory.inventory_api.repository;

import com.autoflex.inventory.inventory_api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
