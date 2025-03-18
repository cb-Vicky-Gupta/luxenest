import Image from "next/image";
import Header from "./(frontend)/containers/header";
import Banner from "./(frontend)/containers/homepage";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
    </div>
  );
}
