// app/api/server-details/route.ts

export async function GET(request: Request) {
    // @ts-ignore
    const ip = request.headers.get('x-forwarded-for') || request.socket.remoteAddress || 'Unknown';
    
    // Returning the IP and host as a mock example
    return new Response(JSON.stringify({ ip, host: request.headers.get('host') }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  