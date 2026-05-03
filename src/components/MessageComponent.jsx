import { use } from 'react';
const MessageComponent = ({ dataPromise }) => {
  const data = use(dataPromise);
  return (
    <div className="card-content success-border">
      <h2>System Response</h2>
      <p className="response-text">{data}</p>
    </div>
  );
};

export default MessageComponent;