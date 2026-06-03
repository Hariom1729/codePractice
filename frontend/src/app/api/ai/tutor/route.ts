import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Mock AI streaming response for premium UI effect
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    // Kick off the streaming in the background
    (async () => {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 600));

      let mockText = '';

      if (message.toLowerCase().includes('array')) {
        mockText = "An array is one of the most fundamental data structures in computer science. Think of it like a row of mailboxes: each mailbox has a specific number (an index) and can hold one piece of mail (data). Because they are stored continuously in memory, retrieving a value by its index takes **O(1)** time!\n\nWould you like me to explain how insertion and deletion work?";
      } else if (message.toLowerCase().includes('12')) {
        mockText = "Okay, imagine you have a giant egg carton! Instead of eggs, you put a piece of paper with a number in each slot. \n\nEvery slot has a number written above it (0, 1, 2, 3...) so you always know exactly which slot is which. That egg carton is your array! It's super fast to look inside slot #4, but if you want to add a new slot in the middle, you have to push all the other eggs over to make room.";
      } else {
        mockText = "That's a great question about " + (context || "Data Structures") + "! Arrays and Linked Lists are the building blocks for more complex algorithms. To truly master them, you need to recognize patterns like **Two Pointers** and the **Sliding Window**. Can I walk you through an example problem?";
      }

      // Stream the response out word by word
      const words = mockText.split(' ');
      for (const word of words) {
        await writer.write(encoder.encode(word + ' '));
        // Random delay between 10ms and 50ms to simulate typing
        await new Promise(r => setTimeout(r, Math.random() * 40 + 10));
      }
      
      await writer.close();
    })();

    return new Response(responseStream.readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
