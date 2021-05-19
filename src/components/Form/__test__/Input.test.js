import React from 'react';
import {cleanup, render} from '@testing-library/react';
import Input from '../Input';


afterEach(cleanup);

it("Input renders correctly",()=>{
    const {queryByTestId,queryByPlaceholderText} = render(<Input name="Name" placeholder="Name" label="Name" value="" onChange={()=>{}}/>)
    expect(queryByTestId("InputField")).toBeTruthy();
    expect(queryByPlaceholderText("Name")).toBeTruthy();
})
