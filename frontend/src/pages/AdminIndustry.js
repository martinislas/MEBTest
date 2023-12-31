import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Box,
  Button,
  Container,
  Form,
  Heading,
  Icon,
  Section,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import RemoveToken from "../auth/RemoveToken";
import StatusNotification from "../components/StatusNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function AdminIndustry() {
  const { id } = useParams();

  return (
    <div>
      <AdminNav />
      <StatusNotification />
      <Container>
        <Section>
          <Heading>Edit Existing Industry</Heading>
          <GetCurrentIndustry id={id} />
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentIndustry({ id }) {
  const [currentIndustry, setCurrentIndustry] = useState({
    name: "",
    displayName: "",
  });

  useEffect(() => {
    async function getIndustry() {
      try {
        const response = await axios.get(`/api/industry/${id}`);
        if (response) {
          setCurrentIndustry({
            name: response.data.name,
            displayName: response.data.display_name,
          });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getIndustry();
  }, [id]);

  if (currentIndustry.name === "") {
    return (
      <div>
        <Section>
          <Container>
            <Box>
              <p>
                <Icon align="center">
                  <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
                </Icon>
                Fetching industry details...
              </p>
            </Box>
          </Container>
        </Section>
      </div>
    );
  }
  return <UpdateCurrentIndustry industry={currentIndustry} />;
}

function UpdateCurrentIndustry({ industry }) {
  const [token] = useToken();

  let navigate = useNavigate();

  // Edit industry form
  const [updateIndustryForm, setUpdateIndustryForm] = useState({
    displayName: industry.displayName,
  });
  const updateIndustryFormDisplayNameField = event =>
    setUpdateIndustryForm({
      displayName: event.target.value,
    });

  // Update Industry
  const onUpdateIndustryClicked = async () => {
    try {
      await axios.put(
        "/api/industry",
        {
          display_name: updateIndustryForm.displayName,
          name: industry.name,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/system`, { state: { status: "success" } });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/system/industry/${industry.name}`, {
            state: { status: "failed" },
          });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <Container>
      <Box>
        <Form.Field>
          <Form.Label>Update Industry Name</Form.Label>
          <Form.Control>
            <Form.Input
              name="displayName"
              type="text"
              value={updateIndustryForm.displayName}
              onChange={updateIndustryFormDisplayNameField}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onUpdateIndustryClicked}>
              Update Industry
            </Button>
          </Form.Control>
        </Form.Field>
      </Box>
    </Container>
  );
}

export default AdminIndustry;
