import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/utils';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';

    render(
      <MainLayout>
        <div>{testContent}</div>
      </MainLayout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders main element with correct structure', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('h-full');
  });

  it('applies correct CSS classes to container', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('h-[100dvh]');
  });

  it('does not show loading overlay by default', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    // Loading overlay should not be visible when isLoading is false
    const loadingOverlay = screen.queryByText('loader');
    expect(loadingOverlay).not.toBeInTheDocument();
  });

  it('includes CSS for loader animation', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    // Check that style tag is present
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain('loader');
    expect(styleTag?.textContent).toContain('spin');
  });

  it('renders multiple children correctly', () => {
    render(
      <MainLayout>
        <div>First Child</div>
        <div>Second Child</div>
      </MainLayout>
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    render(<MainLayout>{null}</MainLayout>);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.children).toHaveLength(0);
  });
});
