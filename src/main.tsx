import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { store } from '@/store';
import { MswProvider } from '@/components/MswProvider';
import { ModelProvider } from 'react-redux-use-model';
import { Provider } from 'react-redux';

const main = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }

  createRoot(document.getElementById('root')!).render(
    <MswProvider>
      <Provider store={store}>
        <ModelProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModelProvider>
      </Provider>
    </MswProvider>,
  );
};

main();
