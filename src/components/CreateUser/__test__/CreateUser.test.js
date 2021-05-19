import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import CreateUserForm from '../CreateUserForm';
import {render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

it("Renders",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<CreateUserForm></CreateUserForm>,div);
    reactDom.unmountComponentAtNode(div);
});