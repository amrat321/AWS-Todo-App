import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./home.css";
import { Grid, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = (theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
  });

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      allValues: [],
      alertArror: "",
    };
  }

  addTodo = async () => {
    if (this.state.value === "") {
      this.setState({ alertArror: "please fill the input" });
    } else {
      await fetch(
        "https://expqhvpwq9.execute-api.ap-south-1.amazonaws.com/addTodo",
        {
          method: "POST",
          body: JSON.stringify({
            value: this.state.value,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            error_message: "Signup Successfully",
          });
        });
    }
  };

  componentDidMount = () => {
    fetch("https://imy14x1eed.execute-api.ap-south-1.amazonaws.com/getTodo")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({ allValues: response.Items });
      });
  };
  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div className="_Home_div">
        <Container maxWidth="xl">
          <Grid container justify="center" spacing={3}>
            <Grid item lg={6} xl={3} xs={12} md={10}>
              <Paper className="paper">
                <h1>Data Management</h1>

                <h3>{this.state.alertArror}</h3>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Enter Data"
                    variant="outlined"
                    onChange={(e) => this.setState({ value: e.target.value })}
                  />
                </form>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.addTodo()}
                >
                  Primary
                </Button>
              </Paper>

              {this.state.allValues.map((val, i) => {
                return (
                  <Paper>
                    <div className="values_div">
                      <span
                        style={{
                          padding: 20,
                          backgroundColor: "dodgerblue",
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                      ></span>
                      {val.todoValue}
                    </div>
                  </Paper>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home);
