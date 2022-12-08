import { screen, render } from "test-utils/test-utils";
import ErrorBoundary from "./error-boundary.component";

describe("error boundary", () => {
  it("shows custom error when component crash", () => {
    const FaultyComponent = (props) => <div> {props.prop1.prop2} </div>;
    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("heading", { name: "Sorry, this page is broken." })
    ).toBeInTheDocument();
  });

  it("renders component when no error occur", () => {
    const RobustComponent = (props) => <h1>Robust Component</h1>;

    render(
      <ErrorBoundary>
        <RobustComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
