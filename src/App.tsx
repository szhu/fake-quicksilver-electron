import { css } from "@emotion/css";
import { Component } from "react";
import DesignSystemText from "./DesignSystem/DesignSystemText";

class App extends Component {
  render() {
    return (
      <>
        <header
          className={css`
            ${DesignSystemText.Caption1.__emotion_styles};
            -webkit-app-region: drag;
            text-align: center;
          `}
        >
          Fake Quicksilver
        </header>
        <DesignSystemText.Caption1>test </DesignSystemText.Caption1>
        <main
          className={css`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          `}
        >
          Hi
        </main>
      </>
    );
  }
}

export default App;
