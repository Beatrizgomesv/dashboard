import {useEffect, useState} from "react";
import axios from "axios";
import type {RawMaterial}
from "../../types/RawMaterial";

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
            const response = await axios.get < RawMaterial[] > ("/raw-materials");
            setMaterials(response.data);
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

            await axios.post("/raw-materials", {name, stockQuantity: Number(stock)});

            setName("");
            setStock("");

            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);

            await loadMaterials();
        } catch {
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setSaving(false);
        
    }
};

const isDisabled = saving || !name || !stock;

return (
    <div className="space-y-8">

        <h1>Matérias-Primas</h1>

        {
        success && (
            <div data-cy="success-message">
                Matéria-prima cadastrada com sucesso!
            </div>
        )
    }

        {
        error && (
            <div data-cy="error-message">
                Erro ao cadastrar matéria-prima.
            </div>
        )
    }

        <div>
            <input data-cy="material-name" placeholder="Nome"
                value={name}
                onChange={
                    (e) => setName(e.target.value)
                }/>

            <input data-cy="material-stock" type="number" placeholder="Estoque"
                value={stock}
                onChange={
                    (e) => setStock(e.target.value)
                }/>

            <button data-cy="submit-material"
                onClick={createMaterial}
                disabled={isDisabled}>
                {
                saving ? "Salvando..." : "Adicionar"
            } </button>
        </div>

        {
        loading && (
            <p data-cy="loading">Carregando matérias-primas...</p>
        )
    }

        <div> {
            materials.map((material) => (
                <div key={
                        material.id
                    }
                    data-cy="material-card">
                    <h3>{
                        material.name
                    }</h3>
                    <p data-cy="material-stock-value">
                        {
                        material.stockQuantity
                    } </p>
                </div>
            ))
        } </div>
    </div>
);}
