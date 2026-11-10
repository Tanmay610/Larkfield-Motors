import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { siteConfig, cars } from "./pages/site/larkfield-motors";

describe("Larkfield Motors App", () => {
  it("has site configuration and 17 cars in inventory", () => {
    expect(siteConfig).toBeDefined();
    expect(siteConfig.header.name).toBe("Larkfield Motors");
    expect(cars.length).toBe(17);
  });

  it("renders the home page with header and hero", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const brandElements = await screen.findAllByText("Larkfield Motors");
    expect(brandElements.length).toBeGreaterThan(0);
    expect(await screen.findByText("Drive")).toBeInTheDocument();
    expect(await screen.findByText("home")).toBeInTheDocument();
    expect(await screen.findByText("today")).toBeInTheDocument();
  });

  it("renders the cars inventory page", async () => {
    render(
      <MemoryRouter initialEntries={["/cars"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Cars for sale")).toBeInTheDocument();
    expect(await screen.findByText("All cars")).toBeInTheDocument();
  });

  it("renders the service booking page", async () => {
    render(
      <MemoryRouter initialEntries={["/service"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Book a service")).toBeInTheDocument();
    expect(await screen.findByText("What do you need?")).toBeInTheDocument();
  });

  it("renders the business & fleet page", async () => {
    render(
      <MemoryRouter initialEntries={["/business"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Business and fleet")).toBeInTheDocument();
    expect(await screen.findByText("From one truck to forty")).toBeInTheDocument();
  });

  it("renders the test drive page", async () => {
    render(
      <MemoryRouter initialEntries={["/test-drive"]}>
        <App />
      </MemoryRouter>
    );
    const elements = await screen.findAllByText("Book a test drive");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("renders an individual car detail page", async () => {
    render(
      <MemoryRouter initialEntries={["/cars/2022-hyundai-tucson"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText("Hyundai Tucson")).toBeInTheDocument();
    expect(await screen.findByText("At a glance")).toBeInTheDocument();
    expect(await screen.findByText("Size it up")).toBeInTheDocument();
  });
});
