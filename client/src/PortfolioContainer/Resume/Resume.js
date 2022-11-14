import React, { useState,useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";
const Resume=(props)=> {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };

  const resumeBullets = [
    { label: "Education", logoSrc: "education" },
    { label: "Work History", logoSrc: "work-history" },
    { label: "Programming Skills", logoSrc: "programming-skills" },
    { label: "Projects", logoSrc: "projects" },
    { label: "Interests", logoSrc: "interests" },
  ];

  const programmingSkillsDetails = [
    { skill: "HTML", ratingPercentage: 80 },
    { skill: "CSS3", ratingPercentage: 70 },
    { skill: "JavaScript", ratingPercentage: 60 },
    { skill: "Mongo Db", ratingPercentage: 70 },
    { skill: "Express Js", ratingPercentage: 60 },
    { skill: "React Js", ratingPercentage: 50 },
    { skill: "Node Js", ratingPercentage: 65 },
    { skill: "Python", ratingPercentage: 70 },
  ];

  const projectDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2022", toDate: "2022" },
      descritption:
        "A Personal Portfolio website to showcase all my details and projects at one place",
      subHeading: "Technologies Used : React Js, Bootstrap",
    },

    {
      title: "Face Recognition Attendence Software",
      duration: { fromDate: "2020", toDate: "2021" },
      descritption:
        "A Software that recognizes the faces of Students and Marks the Attendence",
      subHeading: "Technologies Used : Python, Tkinter, SQL",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={
          "Deenbandhu Chhotu Ram University of Science & Technology"
        }
        subHeading={"BACHELOR OF TECHNOLOGY"}
        fromDate={"2020"}
        toDate={"2024"}
      />
      <ResumeHeading
        heading={"Alpine Vidhyapeeth Public School,Thana Bhawan"}
        subHeading={"Higher Secondary Certificate"}
        fromDate={"2017"}
        toDate={"2019"}
      />
      <ResumeHeading
        heading={"Alpine Vidhyapeeth Public School,Thana Bhawan"}
        subHeading={"Secondary School Certificate"}
        fromDate={"2015"}
        toDate={"2017"}
      />
    </div>,
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"Fresher"}
          subHeading={"Looking for opportunities"}
          fromDate={""}
          toDate={""}
        />
        <div className="experience-description">
          <span className="resume-description-text"></span>
        </div>
        <div className="experience-description">
          <span className="resume-description-text"></span>
        </div>
      </div>
    </div>,
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          {/* <div className="heading-bullet"></div> */}
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,
    <div className="resume-screen-container" key="projects">
      {projectDetails.map((projectDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectDetails.title}
          subHeading={projectDetails.subHeading}
          description={projectDetails.descritption}
          fromDate={projectDetails.duration.fromDate}
          toDate={projectDetails.duration.toDate}
        />
      ))}
    </div>,
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Teaching"
        description="Apart from the code writing and web development, I also love to teach the others whatever I know and try to learn from others."
      />
      <ResumeHeading
        heading="Cricket"
        description="I love to play Cricket a lot and in my vacant time I always do that."
      />
      <ResumeHeading
        heading="Sci-Fi Movies"
        description="Apart from all these I like to watch Sci-fi movies and fiction movies."
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;
    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };
    setCarousalOffSetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
      onClick={() => handleCarousal(index)}
      className={
        index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
      }
      key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}.png`)}
          alt="logo"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffSetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };
  
  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  return (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Detail"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>
          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
