import Head from "next/head";
import Advantages from "../components/Advantages/Advantages";
import BoxShape from "../components/BoxShape/BoxShape";
import FirstSection from "../components/FirstSection/FirstSection";
import Tabs from "../components/Tabs/Tabs";
import GetHired from "../components/GetHired/GetHired";
import styles from "../styles/Home.module.css";
import Steps from "../components/Steps/Steps";
import RealWork from "../components/ReaWork/RealWork";
import Reviews from "../components/Review/Reviews";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import BatchDates from "../components/Batch/BatchDates";

export default function Home() {
  return (
    <>
      <Navbar course={false} />
      <div className={styles.container}>
        <Head>
          <title>Skillslash - Project Based Learning Platform.</title>
          <meta
            name="description"
            content="Learn latest blogs about Artificial Intelligence (AI), Python, Machine Learning, Data Science, NLP, Business Analysis, Data Science"
          />
        </Head>

        <FirstSection />
        <div className={styles.secondSection}>
          <p className="pTop">
            Learn From Top Industry Experts With Live Online Classes
          </p>
          <h4>Shape Your Career Better</h4>
          <div className={styles.boxShapeWrapper}>
            <BoxShape />
          </div>
        </div>
        <div className={styles.Explore} id="explore">
          <h4 className={styles.ExploreH}>Explore Our Courses</h4>
          <Tabs />
        </div>
        <div className={styles.advantage}>
          <Advantages />
        </div>
        <GetHired />
        <div className={styles.stepsWrapper}>
          <p className="pTop">
            Job Focused Programs To Help Realize Your Dreams
          </p>
          <h4>Get Hired in 3 Simple Steps</h4>
          <Steps />
        </div>
        <RealWork />

        <Reviews
          home={true}
          title="Our Mission Is To Provide World-Class Education"
          desc="Our courses are designed for both students and working professionals. Hear from our students to know more."
        />
        <div className={styles.CWrap}>
          <CTA />
        </div>
        <Footer />
      </div>
    </>
  );
}
