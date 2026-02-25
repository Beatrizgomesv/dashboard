import {useEffect, useState} from "react";
import axios from "axios";
import {Package, Layers, TrendingUp} from "lucide-react";

interface ProductionResponse {
    productId: number;
    productName: string;
    quantityProduced: number;
    totalValue: number;
}

export function DashboardPage() {
    const [productsCount, setProductsCount] = useState(0);
    const [materialsCount, setMaterialsCount] = useState(0);
    const [totalProductionValue, setTotalProductionValue] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const [productsRes, materialsRes, productionRes] = await Promise.all([
                axios.get("http://localhost:8080/products"),
                axios.get("http://localhost:8080/raw-materials"),
                axios.get < ProductionResponse[] > ("http://localhost:8080/production"),
            ]);

            setProductsCount(productsRes.data.length);
            setMaterialsCount(materialsRes.data.length);

            const total = productionRes.data.reduce((acc, item) => acc + item.totalValue, 0);

            setTotalProductionValue(total);
        };

        loadData();
    }, []);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>
                <p className="text-gray-500 mt-1">
                    Visão geral do sistema
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Produtos */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center gap-3 text-blue-600">
                        <Package size={22}/>
                        <span className="text-sm font-medium">
                            Produtos
                        </span>
                    </div>
                    <p className="text-3xl font-bold mt-4">
                        {productsCount} </p>
                </div>

                {/* Matérias */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center gap-3 text-purple-600">
                        <Layers size={22}/>
                        <span className="text-sm font-medium">
                            Matérias-Primas
                        </span>
                    </div>
                    <p className="text-3xl font-bold mt-4">
                        {materialsCount} </p>
                </div>

                {/* Produção */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center gap-3 text-green-600">
                        <TrendingUp size={22}/>
                        <span className="text-sm font-medium">
                            Valor Potencial
                        </span>
                    </div>
                    <p className="text-2xl font-bold mt-4">
                        {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(totalProductionValue)
                    } </p>
                </div>
            </div>
        </div>
    );
}
