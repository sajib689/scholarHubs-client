import BannerSlider from "../Components/BannerSlider";
import StudentReview from "../Components/StudentReview";
import Team from "../Components/Team";
import TopScholarships from "../Components/TopScholarships";
import Contact from './../Components/Contact';


const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <TopScholarships/>
            <StudentReview/>
            <Contact/>
            <Team/>
        </div>
    );
};

export default Home;