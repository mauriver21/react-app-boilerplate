import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { store } from './store.ts';
import { ModelProvider } from 'react-redux-use-model';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ModelProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModelProvider>
  </Provider>,
);
