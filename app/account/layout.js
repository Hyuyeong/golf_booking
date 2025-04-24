function layout({ children }) {
  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Account Section
      </h2>
      <div className="border-t pt-4">{children}</div>
    </div>
  );
}

export default layout;
