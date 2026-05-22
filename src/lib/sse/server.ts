import { Processed } from '@/core/ports/processor.ts';

export default function startServer() {
  const controllers = new Set<ReadableStreamDefaultController>();

  const server = Deno.serve({ port: 8000 }, (req: Request) => {
    const stream = new ReadableStream({
      start(controller) {
        controllers.add(controller);

        req.signal.addEventListener('abort', () => {
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
      },
    });
  });

  return {
    server,

    sendEvent(data: Processed) {
      const encoded = new TextEncoder().encode(data.getResult());
      controllers.forEach((controller) => {
        controller.enqueue(encoded);
      });
    },
  };
}
