// src/__tests__/CompanySignIn.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { AuthProvider } from "@/context/auth-context"
import CompanySignIn from "@/app/auth/company/signin/page"
import { useAuth } from "@/context/auth-context"
import { act } from "react-dom/test-utils"
import toast from "react-hot-toast"  // Import toast here to spy on it

// Mock useAuth to simulate successful login
jest.mock('@/context/auth-context', () => ({
  ...jest.requireActual('@/context/auth-context'),
  useAuth: jest.fn(),
}))

describe("CompanySignIn", () => {
  it("should handle successful login", async () => {
    const mockLogin = jest.fn().mockResolvedValueOnce(undefined)  // Simulate successful login
    useAuth.mockReturnValue({ login: mockLogin, loginWithWallet: jest.fn(), logout: jest.fn(), user: null })

    render(
      <AuthProvider>
        <CompanySignIn />
      </AuthProvider>
    )

    const emailInput = screen.getByPlaceholderText("m@example.com")
    const passwordInput = screen.getByPlaceholderText("Password")
    const signInButton = screen.getByText("Sign in")

    fireEvent.change(emailInput, { target: { value: "company@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "123456" } })
    fireEvent.click(signInButton)

    await act(async () => {
      // Wait for async code to complete
    })

    // Check if successful login happens
    expect(mockLogin).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenCalledWith("company@example.com", "123456", "company")
  })

  it("should show error message on invalid credentials", async () => {
    const mockLogin = jest.fn().mockRejectedValueOnce(new Error("Invalid credentials"))
    useAuth.mockReturnValue({ login: mockLogin, loginWithWallet: jest.fn(), logout: jest.fn(), user: null })

    // Spy on the toast.error method to check if it was called
    const toastErrorSpy = jest.spyOn(toast, "error")

    render(
      <AuthProvider>
        <CompanySignIn />
      </AuthProvider>
    )

    const emailInput = screen.getByPlaceholderText("m@example.com")
    const passwordInput = screen.getByPlaceholderText("Password")
    const signInButton = screen.getByText("Sign in")

    fireEvent.change(emailInput, { target: { value: "company@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "wrong-password" } })
    fireEvent.click(signInButton)

    await act(async () => {
      // Wait for async code to complete
    })

    // Check if error toast appears
    expect(toastErrorSpy).toHaveBeenCalledWith("Invalid credentials", {
      duration: 4000,
      icon: "🚫",
    })

    // Optionally check if the toast actually shows up in the DOM
    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument()
  })
})
