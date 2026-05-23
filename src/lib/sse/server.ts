import { Notifiable } from '@/core/ports/notifier.ts';

const encoder = new TextEncoder();

export default function startServer() {
  const controllers = new Set<ReadableStreamDefaultController>();

  const server = Deno.serve({ port: 8000 }, (req: Request) => {
    const url = new URL(req.url);

    if (url.pathname !== '/sse') {
      return new Response(null, { status: 404 });
    }

    const stream = new ReadableStream({
      start(controller) {
        controllers.add(controller);

        req.signal.addEventListener('abort', () => {
          controller.close();
          controllers.delete(controller);
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

  const heartbeat = encoder.encode(': keep-alive\n\n');

  const heartbeatInterval = setInterval(() => {
    controllers.forEach((c) => {
      try {
        c.enqueue(heartbeat);
      } catch (_) {
        controllers.delete(c);
      }
    });
  }, 5000);

  return {
    server,

    sendEvent(data: Notifiable) {
      try {
        const encoded = encoder.encode(`data: ${data.asText()}\n\n`);
        controllers.forEach((controller) => {
          controller.enqueue(encoded);
        });
      } catch (err) {
        console.log(err);
      }
    },

    shutdown() {
      clearInterval(heartbeatInterval);

      controllers.forEach((controller) => {
        try {
          controller.close();
        } catch {
          // no-op: intentionally ignored
        }
      });

      controllers.clear();

      server.shutdown();
    },
  };
}
