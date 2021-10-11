import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Contacts from "@material-ui/icons/Contacts";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import { companyService } from "services/companyService";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const useStyles = makeStyles(styles);

export default function CompanyView() {
  const { id } = useParams();

  const { register: company, handleSubmit, setValue } = useForm();
  const [description, setDescription] = React.useState();

  function changeDescription(html) {
    setDescription(html);
  }

  async function updateCompany(form) {
    try {
      await companyService.update(id, { description, ...form });
      alert("ok");
    } catch (e) {
      console.log(e.response);
    }
  }

  async function fetchCompany(id) {
    const { data } = await companyService.view(id);
    setDescription(data.description);
    const fields = ["title", "activated"];
    fields.forEach((field) => setValue(field, data[field]));
    console.log(data, company);
  }

  React.useEffect(() => {
    fetchCompany(id);
  }, []);

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Contacts />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Edit company</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(updateCompany)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Title
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      ...company("title"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer alignItems="flex-start">
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Description
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <ReactQuill
                    onChange={changeDescription}
                    value={description}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer justify="flex-end">
                <GridItem xs={12} sm={12} md={9}>
                  <div className={classes.checkboxAndRadio}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...company("activated")}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Active"
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer justify="flex-end">
                <GridItem xs={12} sm={12} md={9}>
                  <Button color="rose" type="submit">
                    Submit
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
