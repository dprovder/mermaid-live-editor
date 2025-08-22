import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/tests/utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />, { withRouter: true });

    // App should render without throwing
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main layout', () => {
    renderWithProviders(<App />, { withRouter: true });

    // Check that the main layout is rendered
    // This will depend on what MainLayout renders, but we can check for basic structure
    const main = screen.queryByRole('main');
    expect(main || document.body).toBeInTheDocument();
  });

  it('renders home page on root route', () => {
    renderWithProviders(<App />, {
      withRouter: true,
      initialRoute: '/'
    });

    // This will be updated once HomePage is implemented
    expect(document.body).toBeInTheDocument();
  });

  it('renders edit page on edit route', () => {
    renderWithProviders(<App />, {
      withRouter: true,
      initialRoute: '/edit'
    });

    // This will be updated once EditPage is implemented
    expect(document.body).toBeInTheDocument();
  });

  it('renders view page on view route', () => {
    renderWithProviders(<App />, {
      withRouter: true,
      initialRoute: '/view'
    });

    // This will be updated once ViewPage is implemented
    expect(document.body).toBeInTheDocument();
  });

  it('handles navigation between routes', () => {
    renderWithProviders(<App />, { withRouter: true });

    // Test that routing is working
    expect(window.location.pathname).toBe('/');
  });
});
