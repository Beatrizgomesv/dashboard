import {Link, useLocation} from "react-router-dom";
import {Package, Factory, Layers, LayoutDashboard} from "lucide-react";

export function Navbar() {
    const location = useLocation();

    const linkClass = (path : string) => `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        location.pathname === path ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
    }`;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-4 flex gap-4 justify-center">

                <Link to="/"
                    className={
                        linkClass("/")
                }>
                    <LayoutDashboard size={18}/>
                    Dashboard
                </Link>

                <Link to="/products"
                    className={
                        linkClass("/products")
                }>
                    <Package size={18}/>
                    Produtos
                </Link>

                <Link to="/materials"
                    className={
                        linkClass("/materials")
                }>
                    <Layers size={18}/>
                    Matérias-Primas
                </Link>

                <Link to="/associations"
                    className={
                        linkClass("/associations")
                }>
                    <Factory size={18}/>
                    Associações
                </Link>

                <Link to="/production"
                    className={
                        linkClass("/production")
                }>
                    <Factory size={18}/>
                    Produção
                </Link>

            </div>
        </nav>
    );
}
