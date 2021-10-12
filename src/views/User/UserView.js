import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Contacts from "@material-ui/icons/Contacts";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import "react-quill/dist/quill.snow.css";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import { userService } from "services/userService";
import {Link, useParams} from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Button from "../../components/CustomButtons/Button";
import {Box} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function UserView() {
  const { id } = useParams();
  const [user, setUser] = React.useState({});

  async function fetchUser(id) {
    const { data } = await userService.view(id);
    console.log(data);
    setUser(data);
  }

  React.useEffect(() => {
    fetchUser(id);
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
            <h4 className={classes.cardIconTitle}> {user.username} </h4>
          </CardHeader>

          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <h5><strong>Title:</strong></h5>
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <h5>{user.title}</h5>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <h5><strong>Username:</strong></h5>
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <h5>{user.username}</h5>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <h5><strong>Email:</strong></h5>
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <h5>{user.email}</h5>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <h5><strong>Active:</strong></h5>
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={user.status === 'active'}
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
                />
              </GridItem>
            </GridContainer>
            <GridContainer className="ml-2">
              <Box m={2} pt={3}>
                <Link to={"/admin/user/edit/" + user.id}>
                  <Button color="info" className="ml-2"> <Edit /> Edit</Button>
                </Link>
              </Box>

            </GridContainer>

          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
