import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import MessageComponent from './components/MessageComponent';
import './App.css';

const fetchSystemStatus = (triggerError: boolean = false): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (triggerError) {
        reject(new Error('Connection timeout: Server unreachable.'));
      } else {
        resolve('All systems operational. Data sync completed successfully.');
      }
    }, 1500);
  });
};

function App() {
  const [promise, setPromise] = useState<Promise<string>>(() => fetchSystemStatus());

  const handleRefresh = () => setPromise(fetchSystemStatus(false));
  const handleForceError = () => setPromise(fetchSystemStatus(true));

  return (
    <div className="layout-wrapper">
      <header className="app-header">
        <h1>Async Data Controller</h1>
        <p>React use() Hook Implementation</p>
      </header>

      <main className="dashboard">
        <div className="action-panel">
          <button onClick={handleRefresh} className="btn-primary">Fetch Status</button>
          <button onClick={handleForceError} className="btn-danger">Force Timeout</button>
        </div>

        <div className="display-panel">
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div className="card-content error-border">
                <h2>System Error</h2>
                <p className="response-text error-text">{error.message}</p>
                <button onClick={resetErrorBoundary} className="btn-outline">Retry Connection</button>
              </div>
            )}
            onReset={handleRefresh}
          >
            <Suspense fallback={
              <div className="card-content loading-state">
                <div className="loader-circle"></div>
                <p className="response-text">Establishing connection...</p>
              </div>
            }>
              <MessageComponent dataPromise={promise} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default App;