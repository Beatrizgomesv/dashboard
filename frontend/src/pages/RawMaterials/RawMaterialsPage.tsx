import {useEffect, useState} from "react";
import axios from "axios";
import type {RawMaterial}
from "../../types/RawMaterial";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function RawMaterialsPage() {
    const [materials, setMaterials] = useState < RawMaterial[] > ([]);
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const loadMaterials = async () => {
        try {
            setLoading(true);
            const response = await axios.get < RawMaterial[] > (`${API_URL}/raw-materials`);
            setMaterials(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMaterials();
    }, []);

    const createMaterial = async () => {
        if (!name || !stock) 
            return;
        


        try {
            setSaving(true);
            setError(false);

            await axios.post(`${API_URL}/raw-materials`, {name, stockQuantity: Number(stock)});

            setName("");
            setStock("");

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);

            await loadMaterials();
        } catch (err) {
            console.error(err);
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const isDisabled = saving || !name || !stock;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Matérias-Primas
                </h1>
                <p className="text-gray-500 mt-1">
                    Gerencie o estoque disponível
                </p>
            </div>

            {/* Feedbacks */}
            {
            success && (
                <div data-cy="success-message" className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                    Matéria-prima cadastrada com sucesso!
                </div>
            )
        }

            {
            error && (
                <div data-cy="error-message" className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    Erro ao cadastrar matéria-prima.
                </div>
            )
        }

            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-6">
                    Nova Matéria-Prima
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                    <input data-cy="material-name" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Nome"
                        value={name}
                        onChange={
                            (e) => setName(e.target.value)
                        }/>

                    <input data-cy="material-stock" type="number" min="0" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Estoque"
                        value={stock}
                        onChange={
                            (e) => setStock(e.target.value)
                        }/>

                    <button data-cy="submit-material"
                        onClick={createMaterial}
                        disabled={isDisabled}
                        className={
                            `rounded-lg px-6 py-2 font-medium text-white transition ${
                                isDisabled ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
                <p data-cy="loading" className="text-gray-500">
                    Carregando matérias-primas...
                </p>
            )
        }

            {/* List */}
            <div className="grid md:grid-cols-2 gap-6">
                {
                materials.map((material) => (
                    <div key={
                            material.id
                        }
                        data-cy="material-card"
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {
                                material.name
                            } </h3>

                            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                                ID #{
                                material.id
                            } </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-500 text-sm">
                                Estoque disponível
                            </p>
                            <p data-cy="material-stock-value" className="text-xl font-bold text-gray-800">
                                {
                                material.stockQuantity
                            } </p>
                        </div>
                    </div>
                ))
            } </div>
        </div>
    );
}
