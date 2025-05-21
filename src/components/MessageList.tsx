"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function MessageList() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
      <ul className="space-y-2">
        {messages.map((msg) => {
          return (
            <li key={msg.id} className="bg-gray-100 p-3 rounded text-black">
              <strong>Name</strong>: {msg.name} <br />
              <strong>Message</strong>: {msg.message} <br />
              <strong>User ID</strong>: {msg.userId}
            </li>
          )
        })}
      </ul>
    </div>
  );
}