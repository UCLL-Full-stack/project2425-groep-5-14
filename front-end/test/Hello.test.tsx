import React from 'react';
import { render, screen } from '@testing-library/react';

window.React = React;

// Test hello world om te zien of de testing werkt
test('test hello world', async() => {
    render(<h1>Hello, world!</h1>);

    expect(screen.getByText('Hello, world!'));
});