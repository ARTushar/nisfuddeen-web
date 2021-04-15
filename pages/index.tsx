import Link from "next/link";
const Home: React.FC = () => {
  return (
    <div className="m-8">
      hello world
      <Link href="/langtest">
        <a className="underline text-blue-600"> test lang</a>
      </Link>
    </div>
  );
};

export default Home;
