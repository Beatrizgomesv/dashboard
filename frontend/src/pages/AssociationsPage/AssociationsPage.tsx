import {useEffect, useState} from "react";
import axios from "axios";
import type {Product}
from "../../types/Product";
import type {RawMaterial}
from "../../types/RawMaterial";

export function AssociationsPage() {
    const [products, setProducts] = useState < Product[] > ([]);
    const [materials, setMaterials] = useState < RawMaterial[] > ([]);

    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [quantity, setQuantity] = useState("");

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const [productsRes, materialsRes] = await Promise.all([
                axios.get < Product[] > ("/products"),
                axios.get < RawMaterial[] > ("/raw-materials"),
            ]);

            setProducts(productsRes.data);
            setMaterials(materialsRes.data);
        };

        loadData();
    }, []);

    const createAssociation = async () => {
        if (!selectedProduct || !selectedMaterial || !quantity) 
            return;
        

        try {
            setSaving(true);
            setError(false);

            await axios.post("/product-compositions", {
                productId: Number(selectedProduct),
                rawMaterialId: Number(selectedMaterial),
                quantity: Number(quantity)
            });

            setSelectedProduct("");
            setSelectedMaterial("");
            setQuantity("");

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch {
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setSaving(false);
        
    }
};

const isDisabled = saving || !selectedProduct || !selectedMaterial || !quantity;

return (
    <div className="space-y-8">

        <h1>Associações</h1>

        {
        success && (
            <div data-cy="success-message">
                Associação criada com sucesso!
            </div>
        )
    }

        {
        error && (
            <div data-cy="error-message">
                Erro ao criar associação.
            </div>
        )
    }

        <div>
            <select data-cy="select-product"
                value={selectedProduct}
                onChange={
                    (e) => setSelectedProduct(e.target.value)
            }>
                <option value="">Selecione um produto</option>
                {
                products.map((product) => (
                    <option key={
                            product.id
                        }
                        value={
                            product.id
                    }>
                        {
                        product.name
                    } </option>
                ))
            } </select>

            <select data-cy="select-material"
                value={selectedMaterial}
                onChange={
                    (e) => setSelectedMaterial(e.target.value)
            }>
                <option value="">Selecione uma matéria-prima</option>
                {
                materials.map((material) => (
                    <option key={
                            material.id
                        }
                        value={
                            material.id
                    }>
                        {
                        material.name
                    } </option>
                ))
            } </select>

            <input data-cy="input-quantity" type="number" placeholder="Quantidade necessária"
                value={quantity}
                onChange={
                    (e) => setQuantity(e.target.value)
                }/>

            <button data-cy="submit-association"
                onClick={createAssociation}
                disabled={isDisabled}>
                {
                saving ? "Salvando..." : "Criar Associação"
            } </button>
        </div>
    </div>
);}
