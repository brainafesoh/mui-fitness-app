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
		console.log("TCL: App -> handleChange -> value", value)
    const name = target.name;
		console.log("TCL: App -> handleChange -> target.name", target.name)
    this.setState({
      [name]: value
    })
    console.log(event.target.value)
  })

  handleCreate2 = ((event) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    console.log('Default prevented')
    let title = event['title'].value
    let currentExercises = this.state.exercises
		console.log("TCL: App -> currentExercises", currentExercises)
    if (title) {
      this.setState({
        exercises: [
          ...currentExercises,
          {
            title: title,
            id: Date.now(),
          }
        ]
      })
    }
  })

  handleCreate = e => {
    e.preventDefault()
    const target = e.target
    
    if (target.value) {
      this.setState(({ exercises, title }) => ({
        exercises: [
          ...exercises,
          {
            title: target.value,
            id: Date.now()
          }
        ],
        title: ''
      }))
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
    console.log(target.name)
    console.log([value])
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
          <form className={classes.form}>
            <TextField
              name='title'
              label='Exercise'
              value={title}
              onChange={this.handleChange}
              margin='normal'
            />
            <Button type='submit' color='primary' variant='contained' onSubmit={this.handleCreate}>Create</Button>
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
