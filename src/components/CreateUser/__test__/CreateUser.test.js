import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import CreateUserForm from '../CreateUserForm';
import {cleanup, fireEvent, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import CreateUser from '../CreateUser';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("Renders",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<CreateUserForm></CreateUserForm>,div);
    reactDom.unmountComponentAtNode(div);
});

it("updates on change",()=>{
    const {queryByPlaceholderText} = render(<CreateUser/>)
    const textField = queryByPlaceholderText("Name");
    fireEvent.change(textField,{target:{value:'Test'}})
    expect(textField.value).toBe("Test");
})


it("Reset Button Resets data",()=>{
    const {queryByPlaceholderText,queryByTestId} = render(<CreateUser/>)
    const resetButton = queryByTestId("resetButton");
    const textField = queryByPlaceholderText("Name");
    fireEvent.change(textField,{target:{value:'Test'}});
    expect(textField.value).toBe("Test");
    fireEvent.click(resetButton);
    expect(textField.value).toBe("");
})



it("Form Matches Snapshot",()=>{
    const tree = renderer.create(<CreateUser/>).toJSON();
    expect(tree).toMatchSnapshot();
})
