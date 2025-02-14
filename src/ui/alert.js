import React from "react";

export const Alert = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 p-4">{message}</div>
);

// ✅ Add missing AlertDescription
export const AlertDescription = ({ children }) => (
  <p className="text-sm text-gray-700">{children}</p>
);
