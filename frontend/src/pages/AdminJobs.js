import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Button,
  Container,
  Form,
  Heading,
  Icon,
  Section,
  Table,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import LocationPicker from "../components/LocationPicker";
import IndustryPicker from "../components/IndustryPicker";
import RemoveToken from "../auth/RemoveToken";

function AdminJobs() {
  const [token] = useToken();
  let navigate = useNavigate();

  // Existing jobs
  const [jobList, setJobList] = useState({ jobs: [] });

  useEffect(() => {
    async function getJobs() {
      try {
        const { data: jobs } = await axios.get("/api/jobs");
        if (jobs) {
          setJobList({ jobs });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getJobs();
  }, []);

  // New Job
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    description: "",
    salary: "",
    locationKey: "",
    industryKey: "",
  });
  const updateNewJobForm = ({ target }) =>
    setNewJobForm({ ...newJobForm, [target.name]: target.value });

  const onCreateNewJobClicked = async () => {
    try {
      await axios.post(
        "/api/admins/job",
        {
          name: newJobForm.title,
          description: newJobForm.description,
          salary: newJobForm.salary,
          location_key: newJobForm.locationKey,
          industry_key: newJobForm.industryKey,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/jobs?status=success`);
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate("/admin/jobs?status=failed");
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <Container>
        <Section>
          <Heading>Jobs</Heading>
          <Container>
            <Heading subtitle>Create New Job Posting</Heading>
            <Form.Field>
              <Form.Label>Job Title</Form.Label>
              <Form.Control>
                <Form.Input
                  name="title"
                  type="text"
                  value={newJobForm.title}
                  onChange={updateNewJobForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Job Description</Form.Label>
              <Form.Control>
                <Form.Input
                  name="description"
                  type="text"
                  value={newJobForm.description}
                  onChange={updateNewJobForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Salary</Form.Label>
              <Form.Control>
                <Form.Input
                  name="salary"
                  type="text"
                  value={newJobForm.salary}
                  onChange={updateNewJobForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Location</Form.Label>
              <Form.Control>
                <Form.Select name="locationKey" onChange={updateNewJobForm}>
                  <LocationPicker />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Industry</Form.Label>
              <Form.Control>
                <Form.Select name="industryKey" onChange={updateNewJobForm}>
                  <IndustryPicker />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onCreateNewJobClicked}>
                  Submit
                </Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading subtitle>Existing Jobs</Heading>
            <Table size="fullwidth">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Industry</th>
                  <th>Position Open</th>
                  <th>Current Applicant Count</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {jobList.jobs.map(job => {
                  return (
                    <tr>
                      <td>{job.name}</td>
                      <td>{job.location}</td>
                      <td>{job.industry}</td>
                      <td>
                        {job.active ? (
                          <Icon align="center">
                            <FontAwesomeIcon icon={faCheck} />
                          </Icon>
                        ) : (
                          <Icon align="center">
                            <FontAwesomeIcon icon={faXmark} />
                          </Icon>
                        )}
                      </td>
                      <td>{job.applicant_count}</td>
                      <td>
                        <Button renderAs="a" href={"/admin/jobs/" + job.id}>
                          Manage
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

export default AdminJobs;
