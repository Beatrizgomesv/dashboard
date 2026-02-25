import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";

import axios from "axios";
import {AssociationsPage} from "./AssociationsPage";
import type {Product}
from "../../types/Product";
import type {RawMaterial}
from "../../types/RawMaterial";


vi.mock("axios");

const mockedAxios = axios as unknown as {
    get: ReturnType < typeof vi.fn >;
    post: ReturnType < typeof vi.fn >;
};

describe("AssociationsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should load products and raw materials", async () => {
        const mockedProducts: Product[] = [{
                id: 1,
                name: "Mesa",
                price: 100
            },];

        const mockedMaterials: RawMaterial[] = [{
                id: 2,
                name: "Parafuso",
                stockQuantity: 200
            },];

        mockedAxios.get.mockResolvedValueOnce({data: mockedProducts}).mockResolvedValueOnce({data: mockedMaterials});

        render (<AssociationsPage/>);

        await waitFor(() => {
            expect(screen.getByText("Mesa")).toBeInTheDocument();
            expect(screen.getByText("Parafuso")).toBeInTheDocument();
        });
    });

    it("should create association correctly", async () => {
        const mockedProducts: Product[] = [{
                id: 1,
                name: "Mesa",
                price: 100
            },];

        const mockedMaterials: RawMaterial[] = [{
                id: 2,
                name: "Parafuso",
                stockQuantity: 200
            },];

        mockedAxios.get.mockResolvedValueOnce({data: mockedProducts}).mockResolvedValueOnce({data: mockedMaterials});

        mockedAxios.post.mockResolvedValue({});

        render (<AssociationsPage/>);

        // esperar selects carregarem
        await screen.findByText("Mesa");
        await screen.findByText("Parafuso");

        fireEvent.change(screen.getAllByRole("combobox")[0], {
            target: {
                value: "1"
            }
        });

        fireEvent.change(screen.getAllByRole("combobox")[1], {
            target: {
                value: "2"
            }
        });

        fireEvent.change(screen.getByPlaceholderText("Quantidade necessária"), {
            target: {
                value: "5"
            }
        });

        fireEvent.click(screen.getByText("Criar Associação"));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/product-compositions", {
                productId: 1,
                rawMaterialId: 2,
                quantity: 5
            });
        });
    });

    it("should disable button when fields are empty", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: []}).mockResolvedValueOnce({data: []});

        render (<AssociationsPage/>);

        const button = screen.getByText("Criar Associação");
        expect(button).toBeDisabled();
    });

    it("should show success message after creation", async () => {
        const mockedProducts: Product[] = [{
                id: 1,
                name: "Mesa",
                price: 100
            },];

        const mockedMaterials: RawMaterial[] = [{
                id: 2,
                name: "Parafuso",
                stockQuantity: 200
            },];

        mockedAxios.get.mockResolvedValueOnce({data: mockedProducts}).mockResolvedValueOnce({data: mockedMaterials});

        mockedAxios.post.mockResolvedValue({});

        render (<AssociationsPage/>);

        await screen.findByText("Mesa");
        await screen.findByText("Parafuso");

        fireEvent.change(screen.getAllByRole("combobox")[0], {
            target: {
                value: "1"
            }
        });

        fireEvent.change(screen.getAllByRole("combobox")[1], {
            target: {
                value: "2"
            }
        });

        fireEvent.change(screen.getByPlaceholderText("Quantidade necessária"), {
            target: {
                value: "5"
            }
        });

        fireEvent.click(screen.getByText("Criar Associação"));

        expect(await screen.findByText("Associação criada com sucesso!")).toBeInTheDocument();
    });
});
