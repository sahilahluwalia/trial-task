import Navbar from "@/components/Navbar";
import MainComponent from "@/components/MainComponent";
export default function Home() {
  return (
    <div className=''>
      <div className='h-screen pb-48 '>
        <Navbar />
        <MainComponent />
      </div>
    </div>
  );
}
