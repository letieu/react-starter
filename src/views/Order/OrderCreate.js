import React from "react";
// @material-ui/core components

import { categoryService } from "services/categoryService";
import { useForm } from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import { toast } from "react-toastify";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardIcon from "../../components/Card/CardIcon";
import {Book, MailOutline} from "@material-ui/icons";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function OrderCreate() {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  async function create(payload) {
    try {
      const { data } = await categoryService.create(payload);
      toast.success("Created");
      window.setTimeout(
        () => history.push("/admin/categories/" + data._id),
        500
      );
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function update(payload) {
    try {
      await categoryService.update(id, payload);
      toast.success("Updated");
    } catch (e) {
      toast.error(e?.response?.data?.message[0]);
      console.log(e);
    }
  }

  async function onSubmit(form) {
    if (id) {
      update(form);
    } else {
      create(form);
    }
  }

  async function fetchCategory() {
    try {
      const { data } = await categoryService.view(id);
      const fields = ['title', 'description', 'activated'];
      fields.forEach(field => setValue(field, data[field]));
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    fetchCategory()
  }, [id]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Stacked Form</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                labelText="Customer name"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  ...register('customerName')
                }}
              />
              <CustomInput
                labelText="Customer phone"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  ...register('customerPhone')
                }}
              />
              <CustomInput
                labelText="Customer address"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  ...register('customerAddress')
                }}
              />
              <Button color="rose">Submit</Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Book />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Stacked Form</h4>
          </CardHeader>
          <CardBody>
            <table>
              <thead>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr>
                  <td>P1tabletabletable</td>
                  <td>P1tabletabletable</td>
                  <td>P1tabletabletable</td>
                  <td>P1tabletabletable</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
