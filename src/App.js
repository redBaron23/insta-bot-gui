import React, { Component } from "react";
import "./App.css";
import Main from "./views/Main.jsx";
import { ThemeProvider } from "@material-ui/core/styles";

class App extends Component {
  state = {
    route: "Main"
  };
  render() {
    const { route } = this.state;
    return (
      <div className="App">
        <ThemeProvider >
          <Main />
	  {/*route === "LogIn" && <LoginForm />}
	  {route === "Main" && <Main />*/}
	  </ThemeProvider>
      </div>
    );
  }
}
export default App;
