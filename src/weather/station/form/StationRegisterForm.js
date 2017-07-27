import React from "react";
import styled from "styled-components";

class StationRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formObject: {
        customName: "",
        cityName: "",
        longitude: -1,
        latitude: -1,
        altitude: -1,
      },
    };
  }

  updateState = e => {
    e.preventDefault();
    switch (e.target.id) {
      case "customNameInput":
        this.setState({
          formObject: { ...this.state.formObject, customName: e.target.value },
        });
        break;
      case "cityNameInput":
        this.setState({
          formObject: { ...this.state.formObject, cityName: e.target.value },
        });
        break;
      case "longitudeInput":
        this.setState({
          formObject: { ...this.state.formObject, longitude: e.target.value },
        });
        break;
      case "latitudeInput":
        this.setState({
          formObject: { ...this.state.formObject, latitude: e.target.value },
        });
        break;
      case "altitudeInput":
        this.setState({
          formObject: { ...this.state.formObject, altitude: e.target.value },
        });
        break;
      default:
        break;
    }
  };

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <FormContainer>
        <Form>
          <FormGroup>
            <FormLabel>Custom Name</FormLabel>
            <FormInput
              id="customNameInput"
              type="text"
              className="form-control"
              onChange={this.updateState}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>City Name</FormLabel>
            <FormInput
              id="cityNameInput"
              type="text"
              className="form-control"
              onChange={this.updateState}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Latitude</FormLabel>
            <FormInput
              id="latitudeInput"
              type="text"
              className="form-control"
              onChange={this.updateState}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Longitude</FormLabel>
            <FormInput
              id="longitudeInput"
              type="text"
              className="form-control"
              onChange={this.updateState}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Altitude</FormLabel>
            <FormInput
              id="altitudeInput"
              type="text"
              className="form-control"
              onChange={this.updateState}
            />
          </FormGroup>
          <FormGroup>
            <FormButton type="submit" onClick={this.onSubmit}>Submit</FormButton>
          </FormGroup>
        </Form>
      </FormContainer>
    );
  }
}

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 2px grey;
  background-color: #cddc39;
  padding: 20px;
`;

const FormGroup = styled.div`
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  box-shadow: 1px 1px 2px grey;
  min-width: 400px;
  flex: 2;
`;

const FormLabel = styled.label`
  flex: 1;
  background-color: #827717;
  padding: 5px;
  box-shadow: 1px 1px 2px grey;
  color: white;
  text-align: center;
  font-size: 90%;
`;

const FormButton = styled.button`
  flex: 1;
  background-color: #827717;
  border: none;
  color: white;
  padding: 5px;
  font-size: 130%;
  font-weight: bold;
  box-shadow: 1px 1px 2px grey;

  &:active {
    box-shadow: 0px 0px 0px;
  }
`;

export default StationRegisterForm;
