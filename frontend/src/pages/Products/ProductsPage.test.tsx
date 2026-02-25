import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";
import {ProductsPage} from "./ProductsPage";
import axios from "axios";

vi.mock("axios");

const mockedAxios = vi.mocked(axios, true);

describe("ProductsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render products from API", async () => {
        mockedAxios.get.mockResolvedValue({
            data: [
                {
                    id: 1,
                    name: "Mesa",
                    price: 100
                }
            ]
        });

        render (<ProductsPage/>);

        expect(await screen.findByText("Mesa")).toBeInTheDocument();
    });

    it("should create product", async () => {
        mockedAxios.get.mockResolvedValue({data: []});
        mockedAxios.post.mockResolvedValue({});

        render (<ProductsPage/>);

        fireEvent.change(screen.getByPlaceholderText("Nome do produto"), {
            target: {
                value: "Mesa Nova"
            }
        });

        fireEvent.change(screen.getByPlaceholderText("Preço"), {
            target: {
                value: "200"
            }
        });

        fireEvent.click(screen.getByText("Adicionar"));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/products", {
                name: "Mesa Nova",
                price: 200
            });
        });
    });
});
