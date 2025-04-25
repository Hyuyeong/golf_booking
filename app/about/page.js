export const metadata = {
  title: "About us",
};

function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {/* Virtual Game */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-green-200 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Virtual Game</h2>
        <p className="text-gray-600 text-lg mb-4">
          Regular Price: <span className="font-semibold">$40/hr</span>
        </p>
        <p className="text-sm text-green-700 bg-green-100 rounded px-3 py-2 inline-block font-medium">
          🎉 Happy Hour (9am–12pm): $20/hr
        </p>
      </div>

      {/* Driving Range */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-green-200 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Driving Range
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Regular Price: <span className="font-semibold">$25/hr</span>
        </p>
        <p className="text-sm text-green-700 bg-green-100 rounded px-3 py-2 inline-block font-medium">
          🎉 Happy Hour (9am–12pm): $10/hr
        </p>
      </div>
      <section className="space-y-16 px-6 py-12 col-span-full w-full">
        {/* 01 Driving Range */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-green-900">
            <h2 className="text-3xl font-bold mb-4">01. Driving Range</h2>
            <p className="text-lg leading-relaxed">
              Step into our high-tech driving range powered by Hugolf. Each bay
              offers real-time analytics including swing speed, launch angle,
              spin rate, and more. Dual camera views from the front and side
              help you refine your swing with precision and clarity.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/driving-range.jpg"
              alt="Driving Range"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* 02 Virtual Course */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2 text-green-900">
            <h2 className="text-3xl font-bold mb-4">02. Virtual Courses</h2>
            <p className="text-lg leading-relaxed">
              Play on legendary courses from across the globe—all recreated in
              vivid detail. Whether it's Pebble Beach or Sentosa, our virtual
              simulations offer immersive realism and thrilling gameplay without
              ever leaving the city.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/virtual-course.jpg"
              alt="Virtual Courses"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* 03 Competition */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-green-900">
            <h2 className="text-3xl font-bold mb-4">03. Competitions</h2>
            <p className="text-lg leading-relaxed">
              Join our monthly Hugolf Tournament! Compete on hand-picked courses
              that offer intense challenge and fun. Win exciting prizes while
              experiencing a tournament that feels just like the real deal.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/competition.jpg"
              alt="Competitions"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* 04 Academy */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2 text-green-900">
            <h2 className="text-3xl font-bold mb-4">04. Golf Academy</h2>
            <p className="text-lg leading-relaxed">
              Learn from pro instructors who break down your swing with Hugolf’s
              data-driven feedback. Track your progress with measurable
              improvements and elevate your golf game with every session.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/academy.jpg"
              alt="Golf Academy"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* 05 Lounge & Party */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-green-900">
            <h2 className="text-3xl font-bold mb-4">05. Lounge & Events</h2>
            <p className="text-lg leading-relaxed">
              Unwind in our cozy lounge with snacks and drinks. Host a fun event
              or team challenge using Hugolf’s simulators. Whether it's a casual
              gathering or friendly competition, it’s the perfect place to relax
              and connect.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/lounge.jpg"
              alt="Lounge & Party"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
