import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          {/* <Route path="/home" element={isAuth ? <Homepage /> : <Navigate to="/"/>}/> */}
          <Route path="/home" element={<Homepage />}/>

          <Route path="/" element={<LoginPage />} />
          <Route path="/profile/:usedId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
