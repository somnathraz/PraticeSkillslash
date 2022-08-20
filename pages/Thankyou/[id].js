import React from "react";
import styles from "../../styles/ThankYou.module.css";
import Head from "next/head";
import Image from "next/image";
import { AiOutlineDownload } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import Link from "next/link";
import { getAllPostIds, getPostData } from "../../lib/Thankyou";

export default function ThankYou({ DataScienceCourseData }) {
  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>{DataScienceCourseData.data.metaInfo.title}</title>
          <meta
            name="description"
            content={DataScienceCourseData.data.metaInfo.desc}
          />
        </Head>
        <section className={styles.mains}>
          <div className={styles.left}>
            <h4 className={styles.hptop}>
              <b>Thank you</b>
              <br />
              for showing interest in the program
            </h4>
            <p className={styles.Ptop}>
              We have shared the program brochure with you over an email. Have a
              great day !
            </p>
            <div>
              <div className={styles.mainb}>
                <div>
                  <Link href={DataScienceCourseData.data.back}>
                    <button className={styles.Button}>
                      <BsArrowLeftShort className="bIcons" />
                      Back To Course
                    </button>
                  </Link>
                </div>
                <div>
                  <Link href={DataScienceCourseData.data.url}>
                    <button className={styles.Button}>
                      <AiOutlineDownload className="bIcons" />
                      Download Brochure
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/thank-you.png"
              alt="data-science-course"
              quality={100}
              layout="intrinsic"
              width="500"
              height="550"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const DataScienceCourseData = getPostData(params.id);
  return {
    props: {
      DataScienceCourseData,
    },
  };
}
