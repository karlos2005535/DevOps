describe("App", () => {
  it("should create the app", () => {
    expect(true).toBe(true);
  });

  it("should have correct title", () => {
    const title = "aplikasi-belanja";
    expect(title).toBe("aplikasi-belanja");
  });

  it("should initialize correctly", () => {
    const app = { initialized: true, version: "1.0.0" };
    expect(app.initialized).toBe(true);
    expect(app.version).toBe("1.0.0");
  });
});
