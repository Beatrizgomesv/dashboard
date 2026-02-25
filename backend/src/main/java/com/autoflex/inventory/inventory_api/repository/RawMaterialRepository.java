package com.autoflex.inventory.inventory_api.repository;

import com.autoflex.inventory.inventory_api.model.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
}
