export const metadata = {
  title: "Booking",
};

async function page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  console.log(data);

  return (
    <div>
      booking page
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </div>
  );
}

export default page;
