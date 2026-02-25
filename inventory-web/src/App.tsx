import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout} from "./components/Layout";

import {ProductsPage} from "./pages/Products/ProductsPage";
import {RawMaterialsPage} from "./pages/RawMaterials/RawMaterialsPage";
import {AssociationsPage} from "./pages/AssociationsPage/AssociationsPage";
import {ProductionPage} from "./pages/ProductionPage/ProductionPage";
import {Navbar} from "./components/Navbar";
import {DashboardPage} from "./pages/DashboardPage/DashboardPage";


function App() {
    return (<BrowserRouter>
        <Navbar/>
        <Layout>
            <Routes>

                <Route path="/"
                    element={<DashboardPage/>}/>
                <Route path="/products"
                    element={<ProductsPage/>}/>
                <Route path="/materials"
                    element={<RawMaterialsPage/>}/>
                <Route path="/associations"
                    element={<AssociationsPage/>}/>
                <Route path="/production"
                    element={<ProductionPage/>}/>
            </Routes>
        </Layout>
    </BrowserRouter>);
}

export default App;
