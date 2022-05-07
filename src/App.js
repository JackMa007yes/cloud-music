import React, { memo, Suspense } from "react";
import { renderRoutes } from "react-router-config";
import routes from "@/router";
import store from "./store";
import { Provider } from "react-redux";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import PlayerBar from "@/pages/player/app-player-bar";
import { HashRouter } from "react-router-dom";

const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <AppFooter />
      </HashRouter>
      <PlayerBar />
    </Provider>
  );
});

export default App;
