package com.autoflex.inventory.inventory_api.service;


import com.autoflex.inventory.inventory_api.model.RawMaterial;
import com.autoflex.inventory.inventory_api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialService {

    private final RawMaterialRepository rawMaterialRepository;


    public RawMaterialService(RawMaterialRepository rawMaterialRepository) {
        this.rawMaterialRepository = rawMaterialRepository;
    }

    public RawMaterial findById(Long id) {
        return rawMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Raw material not found"));
    }

    public RawMaterial save(RawMaterial rawMaterial) {
        return rawMaterialRepository.save(rawMaterial);
    }

    public List<RawMaterial> findAll() {
        return rawMaterialRepository.findAll();
    }

    public void delete(Long id) {
        if (!rawMaterialRepository.existsById(id)) {
            throw new RuntimeException("Raw material not found");
        }
        rawMaterialRepository.deleteById(id);
    }

}
