import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import Account from "./pages/Account"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

// staleTime - vreme koliko je data validna, nakon toga se ponovo refetchuje
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})
// pozicija DUGMETA (loga) koje otvara/zatvara panel
// pozicija SAMOG PANELA kad se otvori 
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" position="bottom" />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster 
        position="top-center" 
        gutter={12} 
        containerStyle={{margin: "8px"}}
        toastOptions={{
          success: {
            style: {
              duration: 3000,
              background: "var(--color-green-700)",
              color: "var(--color-grey-0)",
            },
          },
          error: {
            style: {
              duration: 3000,
              background: "var(--color-red-700)",
              color: "var(--color-grey-0)",
            },
          },
          style: {
            fontSize: "1.4rem",
            maxWidth: "26rem",
            padding: "1.6rem 2.4rem",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
            borderRadius: "7px",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App