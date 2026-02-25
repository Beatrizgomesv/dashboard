import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";
import type {RawMaterial}
from "../../types/RawMaterial";
import {RawMaterialsPage} from "./RawMaterialsPage";
import axios from "axios";

vi.mock("axios");


const mockedAxios = axios as unknown as {
    get: ReturnType < typeof vi.fn >;
    post: ReturnType < typeof vi.fn >;
};

describe("RawMaterialsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render raw materials from API", async () => {
        const mockedMaterials: RawMaterial[] = [{
                id: 1,
                name: "Parafuso",
                stockQuantity: 100
            },];

        mockedAxios.get.mockResolvedValue({data: mockedMaterials});

        render (<RawMaterialsPage/>);

        expect(await screen.findByText("Parafuso")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("should create a new raw material", async () => {
        mockedAxios.get.mockResolvedValue({data: []});
        mockedAxios.post.mockResolvedValue({});

        render (<RawMaterialsPage/>);

        fireEvent.change(screen.getByPlaceholderText("Nome"), {
            target: {
                value: "Madeira"
            }
        });

        fireEvent.change(screen.getByPlaceholderText("Estoque"), {
            target: {
                value: "50"
            }
        });

        fireEvent.click(screen.getByText("Adicionar"));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/raw-materials", {
                name: "Madeira",
                stockQuantity: 50
            });
        });
    });

    it("should disable button when inputs are empty", () => {
        render (<RawMaterialsPage/>);
        expect(screen.getByText("Adicionar")).toBeDisabled();
    });

    it("should show success message after creation", async () => {
        mockedAxios.get.mockResolvedValue({data: []});
        mockedAxios.post.mockResolvedValue({});

        render (<RawMaterialsPage/>);

        fireEvent.change(screen.getByPlaceholderText("Nome"), {
            target: {
                value: "Cimento"
            }
        });

        fireEvent.change(screen.getByPlaceholderText("Estoque"), {
            target: {
                value: "30"
            }
        });

        fireEvent.click(screen.getByText("Adicionar"));

        expect(await screen.findByText("Matéria-prima cadastrada com sucesso!")).toBeInTheDocument();
    });
});
