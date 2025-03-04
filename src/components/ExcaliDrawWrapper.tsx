"use client"; // Ensures this runs only on the client side

import dynamic from "next/dynamic";
import { Excalidraw } from "@excalidraw/excalidraw";
//import "@excalidraw/excalidraw/dist/excalidraw.min.css"; // Ensure CSS is imported

// Create a wrapper component that directly returns <Excalidraw />
const ExcalidrawWrapper = () => {
  return (
    <div style={{ height: "500px" }}>
      <Excalidraw />
    </div>
  );
};

// Dynamically import the wrapper component
export default dynamic(() => Promise.resolve(ExcalidrawWrapper), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading Excalidraw...</p>, // Optional: Add a loading state
});