"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function MessageList({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
      <ul className="space-y-2">
        {messages.map((msg, i) => (
          <li key={i} className="bg-gray-100 p-3 rounded">
            <strong>{msg.name}</strong>: {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}