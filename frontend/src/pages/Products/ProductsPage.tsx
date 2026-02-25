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
            const response = await axios.get < Product[] > ("http://localhost:8080/products");
            setProducts(response.data);
        } catch (error) {
            console.error(error);
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

            await axios.post("http://localhost:8080/products", {name, price: parseFloat(price)});


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
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>
                <p className="text-gray-500 mt-1">
                    Gerencie os produtos cadastrados no sistema
                </p>
            </div>

            {/* Success Message */}
            {
            success && (
                <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                    Produto cadastrado com sucesso!
                </div>
            )
        }

            {/* Form Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-6">
                    Novo Produto
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                    <input className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Nome do produto"
                        value={name}
                        onChange={
                            (e) => setName(e.target.value)
                        }/>

                    <input type="number" min="0" step="0.01" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Preço"
                        value={price}
                        onChange={
                            (e) => setPrice(e.target.value)
                        }/>

                    <button onClick={createProduct}
                        disabled={saving}
                        className={
                            `rounded-lg px-6 py-2 font-medium text-white transition ${
                                saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`
                    }>
                        {
                        saving ? "Salvando..." : "Adicionar"
                    } </button>
                </div>
            </div>

            {/* Loading */}
            {
            loading && (
                <div className="animate-pulse text-gray-500">
                    Carregando produtos...
                </div>
            )
        }

            {/* Product List */}
            <div className="grid md:grid-cols-2 gap-6">
                {
                products.map((product) => (
                    <div key={
                            product.id
                        }
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {
                                product.name
                            } </h3>

                            <span className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">
                                ID #{
                                product.id
                            } </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-500 text-sm">Preço</p>
                            <p className="text-xl font-bold text-gray-800">
                                {
                                formatCurrency(product.price)
                            } </p>
                        </div>
                    </div>
                ))
            } </div>
        </div>
    );

}
