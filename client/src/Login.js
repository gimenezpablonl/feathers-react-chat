import React, { Component } from 'react';
import client from './Feathers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6a89cc',
      main: '#4a69bd',
      dark: '#1e3799',
      contrastText: '#fff',
    },
    secondary: {
      light: '#82ccdd',
      main: '#60a3bc',
      dark: '#3c6382',
      contrastText: '#000',
    },
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  login() {
    const { email, password } = this.state;
    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => this.setState({ error }));
  }

  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }

  render() {
      return <ThemeProvider theme={theme}>
      <Container fixed disableGutters>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Card>
        <CardContent>
          <Typography align="center" variant="h5" component="h2"color="primary">
            CHAT
          </Typography>
          <Typography align="center" variant="h5" component="h2"color="error">
          {this.state.error && this.state.error.message}
          </Typography>
          <form noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Box my={1}>
                <TextField variant="outlined" type="email" name="email" placeholder="Usuario" onChange={ev => this.updateField('email', ev)}  />
              </Box>
              <Box my={1}>
                <TextField variant="outlined" type="password" name="password" placeholder="Contraseña" onChange={ev => this.updateField('password', ev)} />
              </Box>
              <Box mt={1}>
                <Button variant="contained" color="primary" onClick={() => this.login()}>Iniciar sesión</Button>
              </Box>
              <Box>
                <Button variant="text" color="primary" onClick={() => this.signup()}>Registrarse</Button>
              </Box>
            </Grid>
          </form>
          </CardContent>
        </Card>
      </Grid>
      </Container>
    </ThemeProvider>
  }
}
