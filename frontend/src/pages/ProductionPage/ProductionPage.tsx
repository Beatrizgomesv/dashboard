import {useState} from "react";
import axios from "axios";

interface ProductionResponse {
    productId: number;
    productName: string;
    quantityProduced: number;
    totalValue: number;
}

export function ProductionPage() {
    const [results, setResults] = useState < ProductionResponse[] > ([]);
    const [loading, setLoading] = useState(false);

    const calculateProduction = async () => {
        try {
            setLoading(true);

            const response = await axios.get < ProductionResponse[] > ("/production");
            setResults(response.data);

        } finally {
            setLoading(false);
        }
    };

    const totalGlobalValue = results.reduce((acc, item) => acc + item.totalValue, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Simulação de Produção
                </h1>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <button data-cy="calculate-button"
                    onClick={calculateProduction}
                    disabled={loading}>
                    {
                    loading ? "Calculando..." : "Calcular Produção"
                } </button>
            </div>

            {
            !loading && results.length === 0 && (
                <div data-cy="empty-state">
                    Nenhum cálculo realizado ainda.
                </div>
            )
        }

            {
            results.length > 0 && (
                <div className="space-y-6">

                    <div data-cy="global-value">
                        {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(totalGlobalValue)
                    } </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {
                        results.map((item) => (
                            <div key={
                                    item.productId
                                }
                                data-cy="production-card"
                                className="bg-white p-6 rounded-xl border">
                                <h3>{
                                    item.productName
                                }</h3>

                                <span data-cy="quantity">
                                    {
                                    item.quantityProduced
                                }
                                    unidades
                                </span>

                                <p data-cy="item-value">
                                    {
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }).format(item.totalValue)
                                } </p>
                            </div>
                        ))
                    } </div>
                </div>
            )
        } </div>
    );
}
