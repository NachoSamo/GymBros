export const Banner = () => {
  return (
    <div className="bg-brand-primary text-white py-24 px-8">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-bold mb-6 text-white">
          Plan. Track. Improve.
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-blue-50 opacity-90">
          Manage your athletes, design progressive training plans, and monitor workload over time.
        </p>
        <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm">
          Create new training plan
        </button>
      </div>
    </div>
  );
};