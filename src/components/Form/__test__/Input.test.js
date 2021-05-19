import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Input from '../Input';
import CreateUser from '../../CreateUser/CreateUser';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("Input renders correctly",()=>{
    const {queryByTestId,queryByPlaceholderText} = render(<Input name="Name" placeholder="Name" label="Name" value="" onChange={()=>{}}/>)
    expect(queryByTestId("InputField")).toBeTruthy();
    expect(queryByPlaceholderText("Name")).toBeTruthy();
})
describe("Input value",()=>{
    it("updates on change",()=>{
        const {queryByPlaceholderText} = render(<CreateUser/>)
        const textField = queryByPlaceholderText("Name");
        fireEvent.change(textField,{target:{value:'Test'}})
        expect(textField.value).toBe("Test");
    })
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


it("Create User Form Matches Snapshot",()=>{
    const tree = renderer.create(<CreateUser/>).toJSON();
    expect(tree).toMatchSnapshot();
})
