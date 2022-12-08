import { screen, render } from "test-utils/test-utils";
import { FormInput } from "./form-input.component";
import userEvent from "@testing-library/user-event";

describe("form input component", () => {
  it("renders label when specified", () => {
    render(<FormInput label='Name' />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("doesn't render label when not specified", () => {
    render(<FormInput />);
    expect(screen.queryByLabelText("Name")).toBeNull();
  });

  it("renders the specified input type", () => {
    render(<FormInput type='button' />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders other properties passed", () => {
    render(<FormInput value='John' readOnly={true} />);
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John")).toHaveAttribute("readonly");
  });

  it("execute the change handler", () => {
    const onChangeMock = jest.fn();
    render(<FormInput type='text' handleChange={onChangeMock} />);

    userEvent.type(screen.getByRole("textbox"), "John");

    expect(onChangeMock).toHaveBeenCalled();
  });
});
