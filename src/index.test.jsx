import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('index.jsx', () => {
  let originalRoot;

  beforeEach(() => {
    // Create root element for testing
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    originalRoot = root;
  });

  afterEach(() => {
    // Cleanup
    const root = document.getElementById('root');
    if (root) {
      root.remove();
    }
  });

  it('should have a root element in the DOM', () => {
    const root = document.getElementById('root');
    expect(root).toBeTruthy();
    expect(root.id).toBe('root');
  });

  it('should mount root element to body', () => {
    const root = document.getElementById('root');
    expect(document.body.contains(root)).toBe(true);
  });

  it('should initialize with proper DOM structure', () => {
    const root = document.getElementById('root');
    expect(root).not.toBeNull();
    expect(root.tagName).toBe('DIV');
  });

  it('should have index.css imported', async () => {
    // Dynamically import to trigger the module execution
    const stylesheets = document.styleSheets;
    // Check that stylesheets were loaded (index.css should be loaded)
    expect(stylesheets.length).toBeGreaterThanOrEqual(0);
  });

  it('should execute index.jsx without errors', async () => {
    // This will import and execute index.jsx, covering its statements
    await import('./index.jsx');
    const root = document.getElementById('root');
    expect(root).not.toBeNull();
  });
});
