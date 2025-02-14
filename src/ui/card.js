import React from "react";

export const Card = ({ children }) => (
  <div className="bg-white shadow-md p-4 rounded-md">{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;

// ✅ Add missing CardHeader and CardTitle
export const CardHeader = ({ children }) => (
  <div className="border-b px-4 py-2 font-semibold">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);
