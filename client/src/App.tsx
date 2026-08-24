/**
 * Paper Instrument visual system: keep the application shell light, editorial, and paper-based.
 * Routes intentionally preserve a simple escape path back to the one-page portfolio foundation.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { Navigation } from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  // make sure to consider if you need authentication for certain routes
  /*
   * Navigation sits above the routed content, never inside a transformed
   * wrapper: a transformed ancestor becomes the containing block for
   * `position: fixed` children, which would make the header scroll away with
   * the page instead of staying pinned to the viewport.
   *
   * There is deliberately no route-level transition. SectionReveal scales and
   * tips what it wraps, and wrapping the whole route in it would put the entire
   * page on one composited layer for an animation that is already finished at
   * scroll 0 — every section performs its own settle as it comes into view,
   * which is where the effect belongs.
   */
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
