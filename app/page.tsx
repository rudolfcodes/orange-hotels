import AvailabilityForm from "@/components/forms/booking/AvailabilityForm";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-br from-transparent to-primary-orange items-center justify-between">
      <Header />
      <Hero />
      <div className="w-full px-6 lg:px-0">
        <AvailabilityForm />
      </div>
      <Footer />
    </main>
  );
}
