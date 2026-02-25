import {useEffect, useState} from "react";
import axios from "axios";
import type {Product}
from "../../types/Product";
import type {RawMaterial}
from "../../types/RawMaterial";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

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
            try {
                const [productsRes, materialsRes] = await Promise.all([
                    axios.get < Product[] > (`${API_URL}/products`),
                    axios.get < RawMaterial[] > (`${API_URL}/raw-materials`),
                ]);

                setProducts(productsRes.data);
                setMaterials(materialsRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadData();
    }, []);

    const createAssociation = async () => {
        if (!selectedProduct || !selectedMaterial || !quantity) 
            return;
        

        try {
            setSaving(true);
            setError(false);

            await axios.post(`${API_URL}/product-compositions`, {
                productId: Number(selectedProduct),
                rawMaterialId: Number(selectedMaterial),
                quantity: Number(quantity)
            });

            setSelectedProduct("");
            setSelectedMaterial("");
            setQuantity("");

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            console.error(err);
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const isDisabled = saving || !selectedProduct || !selectedMaterial || !quantity;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Associações
                </h1>
                <p className="text-gray-500 mt-1">
                    Defina quais matérias-primas compõem cada produto
                </p>
            </div>

            {/* Feedbacks */}
            {
            success && (
                <div data-cy="success-message" className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                    Associação criada com sucesso!
                </div>
            )
        }

            {
            error && (
                <div data-cy="error-message" className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    Erro ao criar associação.
                </div>
            )
        }

            {/* Form Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-6">
                    Nova Associação
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                    <select data-cy="select-product" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

                    <select data-cy="select-material" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

                    <input data-cy="input-quantity" type="number" min="1" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Quantidade necessária"
                        value={quantity}
                        onChange={
                            (e) => setQuantity(e.target.value)
                        }/>
                </div>

                <button data-cy="submit-association"
                    onClick={createAssociation}
                    disabled={isDisabled}
                    className={
                        `mt-6 px-6 py-2 rounded-lg text-white font-medium transition ${
                            isDisabled ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`
                }>
                    {
                    saving ? "Salvando..." : "Criar Associação"
                } </button>
            </div>
        </div>
    );
}
