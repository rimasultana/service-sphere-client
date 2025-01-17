import AboutSection from "../components/About";
import Banner from "../components/Banner";
import PopularServices from "../components/PopularServices";
import ServiceFeatures from "../components/ServiceFeatures";
import WhyChooseUs from "../components/WhyChooseUs";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <div className="pt-3">
        <Banner />
        <PopularServices />
        <WhyChooseUs />
        <ServiceFeatures />
        <AboutSection />
      </div>
    </>
  );
};

export default Home;
