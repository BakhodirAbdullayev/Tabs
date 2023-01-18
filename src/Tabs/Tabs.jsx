import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import { BsChevronDoubleRight } from "react-icons/bs";
import "./Tabs.scss";

const url = "https://course-api.com/react-tabs-project";

const Tabs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  const { company, dates, duties, title } = jobs[value];

  return (
    <div className="container">
      <div className="heading">Experiences</div>

      <div className="jobs">
        <div className="btnContainer">
          {jobs.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setValue(index)}
              className={`jobBtn ${index === value && "activeBtn"}`}
            >
              {item.company}
            </button>
          ))}
        </div>
        <div className="jobInfo">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p>{dates}</p>
          {duties.map((duty, index) => (
            <div className="jobDesc" key={index}>
              <div className="icon">
                <BsChevronDoubleRight />
              </div>
              <div className="text">{duty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
