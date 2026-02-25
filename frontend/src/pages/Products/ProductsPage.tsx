import {useEffect, useState} from "react";
import axios from "axios";
import type {Product}
from "../../types/Product";
import {formatCurrency} from "../../utils/formatCurrency";

export function ProductsPage() {
    const [products, setProducts] = useState < Product[] > ([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get < Product[] > ("/products");
            setProducts(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const createProduct = async () => {
        if (!name || !price) 
            return;
        

        try {
            setSaving(true);

            await axios.post("/products", {name, price: parseFloat(price)});

            setName("");
            setPrice("");
            setSuccess(true);

            await loadProducts();

            setTimeout(() => setSuccess(false), 2000);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>
            </div>

            {
            success && (
                <div data-cy="success-message" className="bg-green-100 p-3 rounded-lg">
                    Produto cadastrado com sucesso!
                </div>
            )
        }

            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-lg font-semibold mb-6">Novo Produto</h2>

                <div className="grid md:grid-cols-3 gap-4">
                    <input data-cy="product-name" placeholder="Nome do produto"
                        value={name}
                        onChange={
                            (e) => setName(e.target.value)
                        }/>

                    <input data-cy="product-price" type="number" placeholder="Preço"
                        value={price}
                        onChange={
                            (e) => setPrice(e.target.value)
                        }/>

                    <button data-cy="submit-product"
                        onClick={createProduct}
                        disabled={saving}>
                        {
                        saving ? "Salvando..." : "Adicionar"
                    } </button>
                </div>
            </div>

            {
            loading && (
                <div data-cy="loading">Carregando produtos...</div>
            )
        }

            <div className="grid md:grid-cols-2 gap-6">
                {
                products.map((product) => (
                    <div key={
                            product.id
                        }
                        data-cy="product-card"
                        className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3>{
                            product.name
                        }</h3>
                        <p data-cy="product-price-value">
                            {
                            formatCurrency(product.price)
                        } </p>
                    </div>
                ))
            } </div>
        </div>
    );
}
