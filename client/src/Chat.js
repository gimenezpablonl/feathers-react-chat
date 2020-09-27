import React, { Component } from 'react';
import client from './Feathers';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'moment/locale/es'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send';

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

export default class Chat extends Component {
  sendMessage(ev) {
    const input = ev.target.querySelector('[name="text"]');
    const text = input.value.trim();

    if(text) {
      client.service('messages').create({ text }).then(() => {
        input.value = '';
      });
    }

    ev.preventDefault();
  }
  scrollToBottom() {
    const chat = this.chat;
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }

  componentDidMount() {
    this.scrollToBottom = this.scrollToBottom.bind(this);
    client.service('messages').on('created', this.scrollToBottom);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    // Clean up listeners
    client.service('messages').removeListener('created', this.scrollToBottom);
  }

  render() {
    const { users, messages } = this.props;

    return (
      <ThemeProvider theme={theme}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} style={{backgroundColor: "#fff", height:'100%'}}>
              <List style={{ width: '100%', height:'88vh', overflow: 'auto' }}>
                <ListSubheader>
                {users.length} usuarios
                </ListSubheader>  
                {users.map((user, index) => 
                <ListItem key={index}>
                  <ListItemText>
                    <Typography variant="h6">
                      {user.email}
                    </Typography>
                  </ListItemText>
                </ListItem>)}
              </List>
              <ListItem>
                <Button startIcon={<ExitToAppIcon/>} fullWidth variant="outlined" color="secondary" onClick={() => client.logout()}>
                  Salir
                </Button>
              </ListItem>
            </Grid>
            <Grid item fixed xs={12} md={9} style={{backgroundColor: "#6a89cc", height:'100%'}}>
            <Scrollbars style={{ minHeight: '89vh' }}>
            <List fullWidth className="chat" ref={List => { this.chat = List; }} style={{ width: '100%',position: 'relative', overflow: 'hidden' }}>
                {messages.map((message, index) => 
                <ListItem key={index}>
                  <ListItemText>
                    <Typography variant="overline" style={{ marginRight: "10px" }}>
                      <b>{message.user.email}</b>
                    </Typography>
                    <Typography variant="overline">
                      {moment(message.createdAt).locale('es').format('D MMMM, hh:mm:ss')}
                    </Typography>
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                  </ListItemText>
                </ListItem>)}
                <ListItem>
              </ListItem>
              </List>
              </Scrollbars>
              <form noValidate onSubmit={this.sendMessage.bind(this)}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={10}>
                  <TextField fullWidth variant="filled" name="text"/>
                  </Grid>
                  <Grid item xs={2}>
                  <Button style={{ float:'right' }} startIcon={<SendIcon/>} variant="contained" type="submit">Enviar</Button>
                </Grid>
                </Grid>
              </form>
            </Grid>
            </Grid>
      </ThemeProvider>
    )
  }
}