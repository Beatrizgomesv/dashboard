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
            const response = await axios.get < ProductionResponse[] > ("http://localhost:8080/production");
            setResults(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const totalGlobalValue = results.reduce((acc, item) => acc + item.totalValue, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Simulação de Produção
                </h1>
                <p className="text-gray-500 mt-1">
                    Veja quais produtos podem ser produzidos com o estoque atual
                </p>
            </div>

            {/* Action */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <button onClick={calculateProduction}
                    disabled={loading}
                    className={
                        `px-6 py-3 rounded-lg text-white font-medium transition ${
                            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`
                }>
                    {
                    loading ? "Calculando..." : "Calcular Produção"
                } </button>
            </div>

            {/* Empty State */}
            {
            !loading && results.length === 0 && (
                <div className="text-gray-500">
                    Nenhum cálculo realizado ainda.
                </div>
            )
        }

            {/* Results */}
            {
            results.length > 0 && (
                <div className="space-y-6">
                    {/* Global Value */}
                    <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                        <p className="text-sm text-green-700">
                            Valor total potencial de produção
                        </p>
                        <p className="text-3xl font-bold text-green-800 mt-2">
                            {
                            new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(totalGlobalValue)
                        } </p>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {
                        results.map((item) => (
                            <div key={
                                    item.productId
                                }
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {
                                        item.productName
                                    } </h3>

                                    <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                                        {
                                        item.quantityProduced
                                    }
                                        unidades
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <p className="text-gray-500 text-sm">
                                        Valor total
                                    </p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {
                                        new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        }).format(item.totalValue)
                                    } </p>
                                </div>
                            </div>
                        ))
                    } </div>
                </div>
            )
        } </div>
    );
}
