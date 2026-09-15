/** Harbor Blueprint style: global routing preserves a clear escape route between browsing, planning, and request review. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import MotionLayer from "./components/MotionLayer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RentalProvider } from "./contexts/RentalContext";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import RentalDetail from "./pages/RentalDetail";
import QuoteBuilder from "./pages/QuoteBuilder";
import BookingConfirmation from "./pages/BookingConfirmation";
import Plan from "./pages/Plan";
import About from "./pages/About";

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");


function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/plan"} component={Plan} />
      <Route path={"/browse"} component={Browse} />
      <Route path={"/rentals/:id"} component={RentalDetail} />
      <Route path={"/quote"} component={QuoteBuilder} />
      <Route path={"/confirmation"} component={BookingConfirmation} />
      <Route path={"/about"} component={About} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <RentalProvider>
          <TooltipProvider>
            <Toaster />
            <MotionLayer />
            <WouterRouter base={routerBase}><AppRoutes /></WouterRouter>
          </TooltipProvider>
        </RentalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
