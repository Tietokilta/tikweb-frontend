import { render } from "@testing-library/react"
import IndexPage from "../../src/pages/index"

describe("pages/index.tsx", () => {
  test("Renders correctly", () => {
    const { container } = render(<IndexPage />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
