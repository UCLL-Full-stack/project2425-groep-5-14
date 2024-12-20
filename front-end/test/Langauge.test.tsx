import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Language from '../components/Language';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('Language', () => {
    const mockPush = jest.fn();
    const mockUseTranslation = {
        i18n: {
            language: 'en',
            changeLanguage: jest.fn(),
        },
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
        (useTranslation as jest.Mock).mockReturnValue(mockUseTranslation);
    });

    it('renders the language selector with options', () => {
        render(<Language />);

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Nederlands' })).toBeInTheDocument();
    });

    it('sets the correct initial language', () => {
        render(<Language />);

        expect(screen.getByRole('combobox')).toHaveValue('en');
    });
});