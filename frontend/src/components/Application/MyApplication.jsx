import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import toast from 'react-hot-toast';
import ResumeModal from './Resume.jsx';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../header.jsx';
import { CardFour } from './cards.jsx';
function MyApplication() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
const navigateTo = useNavigate();

useEffect(() => {
  try {
    if (user && user.role === "Employer") {
      axios
        .get(`${BASE_URL}/applications/employer/allApplications`, {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data.allApplication);
        });
    } else {
      axios
        .get(`${BASE_URL}/applications/JobSeeker/allApplications`, {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data.allApplication);
        });
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
}, [isAuthorized]);

console.log("fghj",applications);
if (!isAuthorized) {
  navigateTo("/");
}

const deleteApplication = (id) => {
  try {
    axios
      .delete(`${BASE_URL}/applications/JobSeeker/deleteApplication/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prevApplication) =>
          prevApplication.filter((application) => application._id !== id)
        );
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const openModal = (imageUrl) => {
  setResumeImageUrl(imageUrl);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

  return (
    <section className="my_applications page">
    {user && user.role === "Job Seeker" ? (
      <div className="container">
        <h1>My Applications</h1>
        {applications.length <= 0 ? (
          <>
            {" "}
            <h4>No Applications Found</h4>{" "}
          </>
        ) : (
          applications.map((element) => {
            return (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            );
          })
        )}
      </div>
    ) : (
      <div className="container">
        <h1>Applications From Job Seekers</h1>
        {applications.length <= 0 ? (
          <>
            <h4>No Applications Found</h4>
          </>
        ) : (
          applications.map((element) => {
            return (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            );
          })
        )}
      </div>
    )}
    {modalOpen && (
      <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
    )}
  </section>
);
};

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
return (
  <>
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverletter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  </>
);
};

const EmployerCard = ({ element, openModal }) => {
return (
  <>
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverletter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  </>
);
};