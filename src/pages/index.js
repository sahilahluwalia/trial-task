import Navbar from "@/components/Navbar";
import MainComponent from "@/components/MainComponent";
export default function Home() {
  return (
    <div className='bg-[#F5F5F5]'>
      <div className='h-screen pb-48 '>
        <Navbar />
        <MainComponent />
      </div>
    </div>
  );
}
