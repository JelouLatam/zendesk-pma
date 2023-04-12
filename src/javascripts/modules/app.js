/**
 *  Example app
 **/
import React from "react";
import { render } from "react-dom";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import I18n from "../../javascripts/lib/i18n";
import {
  resizeContainer,
  escapeSpecialChars as escape,
} from "../../javascripts/lib/helpers";

const MAX_HEIGHT = 1000;
const API_ENDPOINTS = {
  organizations: "/api/v2/organizations.json",
};

class App {
  constructor(client, _appData) {
    this._client = client;

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init();
  }

  /**
   * Initialize module, render main template
   */
  async init() {
    const currentUser = (await this._client.get("currentUser")).currentUser;
    console.log(currentUser.locale);
    I18n.loadTranslations(currentUser.locale);

    const appContainer = document.querySelector(".main");

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
        <Grid>
          <Row>
            <Col>
              <span>
                {I18n.t("default.description_greeting", {
                  userName: currentUser.name,
                })}
              </span>
            </Col>
          </Row>
        </Grid>
      </ThemeProvider>,
      appContainer
    );
    return resizeContainer(this._client, MAX_HEIGHT);
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError(error) {
    console.log("Error", error.message);
  }
}

export default App;
