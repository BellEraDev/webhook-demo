"use client";
import { useState, useEffect } from "react";
import MessageList from "@/components/MessageList";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Dashboard() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

    useEffect(() => {
        let storedId = localStorage.getItem("user_id");
        if (!storedId) {
          storedId = uuidv4();
          localStorage.setItem("user_id", storedId);
        }
        setUserId(storedId);
      }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            message,
            userId,
        };
        const webhookUrl = "https://webhook.site/c6f8ec76-b5a4-4778-ab0a-c200923fb916";
        try {
          const resWeb = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      
          if (!resWeb.ok) {
            throw new Error('Failed to call webhook');
          }
      
          console.log('Webhook sent successfully!');
        } catch (error) {
          console.error('Webhook error:', error);
        }
      try {
        const resFb = await addDoc(collection(db, "messages"), {
          name,
          message,
          userId,
          createdAt: new Date(),
        });

        if (!resFb) {
          throw new Error('Failed to call Firebase');
        }
        console.log('Firebase sent successfully!');

      } catch (error) {
          console.error('Firebase error:', error);
      }
      };

      return (
        <div className="max-w-xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
    
            <div>
              <label className="block font-medium mb-1">Message</label>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
    
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              Send
            </button>
          </form>
          <MessageList />
        </div>
      );
}
