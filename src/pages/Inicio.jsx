import Carousel from "../components/Carousel";
import Cartelera from "../components/Cartelera";
import Hero from "../components/Hero";

export default function Inicio() {
  return (
    <main className="container py-4">
      <Hero />
      <Carousel />
      <Cartelera />
    </main>
  );
}