import {render, screen, fireEvent} from "@testing-library/react";
import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";
import axios from "axios";
import {ProductionPage} from "./ProductionPage";

vi.mock("axios");

const mockedAxios = axios as unknown as {
    get: ReturnType < typeof vi.fn >;
};

describe("ProductionPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render initial state", () => {
        render (<ProductionPage/>);

        expect(screen.getByText("Simulação de Produção")).toBeInTheDocument();
        expect(screen.getByText("Calcular Produção")).toBeInTheDocument();
        expect(screen.getByText("Nenhum cálculo realizado ainda.")).toBeInTheDocument();
    });

    it("should calculate production when button is clicked", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    productId: 1,
                    productName: "Mesa",
                    quantityProduced: 3,
                    totalValue: 300
                },
            ]
        });

        render (<ProductionPage/>);

        fireEvent.click(screen.getByText("Calcular Produção"));

        expect(await screen.findByText("Mesa")).toBeInTheDocument();
        expect(await screen.findByText(/3\s*unidades/)).toBeInTheDocument();

        const values = await screen.findAllByText("R$ 300,00");
        expect(values).toHaveLength(2);
    });
})
