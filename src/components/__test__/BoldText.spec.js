import { render, screen } from '@testing-library/react';
import BoldText from '../BoldText';

test('Renders text provided with <strong> text if there is a match', () => {
    render(
    <BoldText
        text={'Hello world!'}
        match={'hel'}
    />);

    const htmlContent = '<div data-testid="boldText-testId"><strong>Hel</strong>lo world!</div>'
    const element = screen.getByTestId('boldText-testId')
    
    expect(element).toContainHTML(htmlContent)
});

test('Renders text provided with as many <strong> text as text matches', () => {
    render(
    <BoldText
        text={'abcdefg, abcd, abc'}
        match={'abc'}
    />);

    const htmlContent = '<div data-testid="boldText-testId"><strong>abc</strong>defg, <strong>abc</strong>d, <strong>abc</strong></div>'
    const element = screen.getByTestId('boldText-testId')
    
    expect(element).toContainHTML(htmlContent)
});

test('Renders text provided without any <strong> text if there is no match', () => {
    render(
    <BoldText
        text={'Hello world!'}
        match={'abc'}
    />);

    const htmlContent = '<div data-testid="boldText-testId">Hello world!</div>'
    const element = screen.getByTestId('boldText-testId')

    expect(element).toContainHTML(htmlContent)
});

// Tests for undefined props would be the next step
// This would imply enhancing the <BoldText /> component to handle these cases