import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import useToken from '../auth/UseToken';

function GetApplicantAsAdmin({ applicantID }) {
    const [token, ] = useToken();
    const [applicant, setApplicant] = useState(null)
  
    useEffect(() => {
      async function getApplicant() {
        try {
          const response = axios.get(`/api/admin/applicant/${applicantID}`, {
            headers: {'Authorization': 'Bearer ' + token}
          });
          if (response) {
            setApplicant({applicant: response.data})
          }
        } catch (e) {
          console.log(e)
        }  
      }
  
      getApplicant()
    }, [applicantID, token]);
  
    if (applicant === null) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      )
    }
    return (
      <tr>
        <td>{applicant.first_name}</td>
        <td>{applicant.middle_name}</td>
        <td>{applicant.last_name}</td>
        <td>{applicant.phone}</td>
        <td>
          <Button renderAs="a" href={'/admin/applicant/'+applicant.id}>View Applicant</Button>
        </td>
      </tr>
    );
}

export default GetApplicantAsAdmin;