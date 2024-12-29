import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const GroupChat = () => {
  const [membersCount, setMembersCount] = useState(0);
  const [groupId, setGroupId] = useState(""); // Store the current groupId

  // Join the room when the component mounts
  useEffect(() => {
    if (groupId) {
      socket.emit("join room", groupId);
    }

    // Listen for the room member count event
    socket.on("room member count", (count) => {
      setMembersCount(count); // Update the members count in the UI
    });

    // Cleanup: leave the room when the component unmounts
    return () => {
      socket.emit("leave room", groupId);
    };
  }, [groupId]); // Re-run the effect when the groupId changes

  return (
    <div>
      <h3>Room Members: {membersCount}</h3>
      {/* Render your chat messages and other components here */}
    </div>
  );
};

export default GroupChat;
