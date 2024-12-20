import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { getUserByUsername } from '@/service/userService';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/service/userService', () => ({
  getUserByUsername: jest.fn(),
}));

describe('Header', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    localStorage.clear();
  });

  it('renders the header with links', () => {
    render(<Header />);

    expect(screen.getByText('Game Hub')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  it('shows login link when user is not logged in', () => {
    render(<Header />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows profile and logout links when user is logged in', async () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userName', 'testUser');
    (getUserByUsername as jest.Mock).mockResolvedValue({ username: 'testUser', role: 'user' });

    render(<Header />);

    expect(await screen.findByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('shows admin link when user is an admin', async () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userName', 'adminUser');
    (getUserByUsername as jest.Mock).mockResolvedValue({ username: 'adminUser', role: 'admin' });

    render(<Header />);

    expect(await screen.findByText('Admin')).toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userName', 'testUser');
    (getUserByUsername as jest.Mock).mockResolvedValue({ username: 'testUser', role: 'user' });

    render(<Header />);

    fireEvent.click(await screen.findByText('Logout'));

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});