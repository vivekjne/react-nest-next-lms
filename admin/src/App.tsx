import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import CategoryIndex from "./screens/Categories";
import CategoryCreate from "./screens/Categories/create";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout>
          <Switch>
            <Route exact path="/categories">
              <CategoryIndex />
            </Route>
            <Route exact path="/categories/new">
              <CategoryCreate />
            </Route>
          </Switch>
        </MainLayout>
      </Router>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
