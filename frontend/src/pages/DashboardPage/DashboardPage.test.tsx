import {render, screen, waitFor} from "@testing-library/react";
import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";
import axios from "axios";
import {DashboardPage} from "./DashboardPage";

vi.mock("axios");

const mockedAxios = axios as unknown as {
    get: ReturnType < typeof vi.fn >;
};

describe("DashboardPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should load dashboard data correctly", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    name: "Mesa",
                    price: 100
                }, {
                    id: 2,
                    name: "Cadeira",
                    price: 50
                },
            ]
        }).mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    name: "Madeira",
                    stockQuantity: 100
                },
            ]
        }).mockResolvedValueOnce({
            data: [
                {
                    productId: 1,
                    productName: "Mesa",
                    quantityProduced: 10,
                    totalValue: 1000
                }, {
                    productId: 2,
                    productName: "Cadeira",
                    quantityProduced: 5,
                    totalValue: 500
                },
            ]
        });

        render (<DashboardPage/>);

        await waitFor(() => {
            expect(screen.getByText("2")).toBeInTheDocument();


            expect(screen.getByText("1")).toBeInTheDocument();

            expect(screen.getByText("R$ 1.500,00")).toBeInTheDocument();
        });
    });
});
