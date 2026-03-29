import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { AppContextProvider } from "./contexts/AppContext/provider";
import { googleLightTheme } from "./styles/Theme";
import * as pages from "./pages";


const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={googleLightTheme}>
        <CssBaseline />
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path={pages.routes.getMainPage()} element={<pages.MainPage />}/>
                <Route path={pages.routes.getAppPage(":slug")}>
                  <Route index element={<pages.ResourcePage />} />
                  <Route path={'logs'}  element={<pages.ResourcePage />} />
                  <Route path={'warnings'}  element={<pages.ResourcePage />} />
                  <Route path={'errors'}  element={<pages.ResourcePage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};