import React from "react";

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import MainRouter from "../src/router/MainRouter";

describe("Create basic test e2e test", () => {
  test("Basic Test Creation", async () => {
    const user = userEvent;
    render(<MainRouter />);

    const basicTestLink = await screen.findByTestId("Basic test");
    expect(basicTestLink).toBeDefined();
    await user.click(basicTestLink);

    const form = await screen.findByTestId("Basic test form");
    expect(form).toBeDefined();

    screen.debug();
  });
});
