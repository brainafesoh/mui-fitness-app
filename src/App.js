import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItemText,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import {
  Delete
} from '@material-ui/icons';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import {
  orange,
  blue,
  brown,
  pink,
  deepPurple
} from '@material-ui/core/colors'

const styles = ({spacing: {unit}}) => ({
  root: {
    margin: unit*7,
    padding: unit * 3,
    maxWidth: 400,
  },
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
  },
  formControl: {
    margin: unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: unit * 2,
  },
})

class App extends React.Component {
  state = {
      exercises: [
        {id: 1, title: 'Bench Press'},
        {id: 2, title: 'Deadlift'},
        {id: 3, title: 'Squats'},
      ],
      title: '',
      theme: createMuiTheme({
        palette: {
          type: 'light',
          primary: orange
      },
    })
  }

  handleChange = ((event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  })

  handleCreate = event => {
    event.preventDefault();
    let currentExercises = this.state.exercises
    if (this.state.title !== ''){
      this.setState({
        exercises: [
          ...currentExercises,
          {
            title: this.state.title,
            id: Date.now(),
          }
        ],
        title: ''
      })
    }
  }

  handleDelete = id => {
    this.setState(({exercises}) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }))
  }

  handleChangeColor = event => {
    const target = event.target
    const value = target.value
    const currentTheme = (target.name === 'type' ? {} : this.state.theme)
    this.setState({
      [target.name]: value
    })
    this.setState({
      theme: createMuiTheme({
        palette: {
          ...currentTheme.palette,
          [target.name]: value
        }
      })
    })
  }

  render() {
    const { title, exercises } = this.state
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <Paper className={classes.root}>
          <Typography variant='display1' align='center' gutterBottom>
            Exercises
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="primaryColor">Primary Color</InputLabel>
            <Select
              value={this.state.theme.palette.primary}
              onChange={this.handleChangeColor}
              inputProps={{
                name: 'primary',
                id: 'primaryColor',
              }}
            >
              <MenuItem value={orange}>Orange</MenuItem>
              <MenuItem value={blue}>Blue</MenuItem>
              <MenuItem value={brown}>Brown</MenuItem>
              <MenuItem value={pink}>Pink</MenuItem>
              <MenuItem value={deepPurple}>Deep Purple</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="themeType">Theme Type</InputLabel>
            <Select
              value={this.state.theme.palette.type}
              onChange={this.handleChangeColor}
              inputProps={{
                name: 'type',
                id: 'themeType',
              }}
            >
              <MenuItem value='light'>Light</MenuItem>
              <MenuItem value='dark'>Dark</MenuItem>
            </Select>
          </FormControl>
          <form className={classes.form} onSubmit={this.handleCreate}>
            <TextField
              name='title'
              label='Exercise'
              value={title}
              onChange={this.handleChange}
              margin='normal'
            />
            <Button type='submit' color='primary' variant='contained'>Create</Button>
          </form>
          <List>
            {exercises.map(({ id, title }) =>
              <ListItem key={id}>
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <IconButton 
                    color='secondary'
                    onClick={() => this.handleDelete(id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
