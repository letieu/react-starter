import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
// import Check from "@material-ui/icons/Check";
import Contacts from "@material-ui/icons/Contacts";
import useNotify from "hooks/useNotify.js";

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

// import { productService } from "services/productService";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function ProductCreate() {
  const [notify, showError] = useNotify();
  const { register: product, handleSubmit } = useForm();
  const [description, setDescription] = React.useState();
  const fileInput = React.createRef();
  const history = useHistory();

  function changeDescription(html) {
    setDescription(html);
  }

  function handleSelectImage() {
    try{
      if(fileInput.current.files[0]){
        document.getElementById('pc-img-product').src = URL.createObjectURL(fileInput.current.files[0]) 
      }else{
        document.getElementById('pc-img-product').src = ""
      }   
    }catch(err){
        console.log(err)
    }
  }

  async function createProduct(form) {
    try {
      // const { data } = await productService.create({ description, ...form });
      
      console.log(form);
      // showSuccess();
      // window.setTimeout(() => history.push("/admin/product/" + data._id), 2000);
    } catch (e) {
      showError();
    }
  }

  const classes = useStyles();
  return (
    <GridContainer>
      {notify}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Contacts />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Create product</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(createProduct)}>
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
                      ...product("title"),
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
              <GridContainer alignItems="flex-start">
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Image
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <img
                      src="#"
                      alt=""
                      style={{height: "300px", weight: "400px"}}
                      id="pc-img-product"
                    />
                    <input 
                      type="file"
                      id="img-product"
                      name="img-product"
                      onChange={() => handleSelectImage()}
                      ref={fileInput}
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Category
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      ...product("categories"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Tags
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      ...product("tags"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Unit
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      ...product("unit"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Unit price
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      ...product("unitprice"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              <GridContainer justify="flex-end">
                <GridItem xs={12} sm={12} md={9}>
                <Button onClick={() => history.goBack()}>Cancel</Button>
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
