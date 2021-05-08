import "@testing-library/jest-dom/extend-expect"

// eslint-disable-next-line no-underscore-dangle
global.___loader = {
  enqueue: jest.fn(),
}
