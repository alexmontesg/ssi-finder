import { useEffect } from "react";

const EVENT_SOURCE_URL = "/sse";

function App() {
  useEffect(() => {
    const eventSource = new EventSource(EVENT_SOURCE_URL);
    eventSource.onmessage = (ev) => console.log(ev);

    return () => eventSource.close();
  }, []);

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
