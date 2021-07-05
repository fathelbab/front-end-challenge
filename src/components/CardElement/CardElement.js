import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import style from "./style.css";

const CardElement = ({ posts }) => {
  return (
    <section>
      {posts &&
        posts.map((reporsitory) => (
          <div
            className="row"
            key={reporsitory.id}
          >
            <img className="img" src={reporsitory.owner.avatar_url} alt="Repo Owner" />
              <div className="Content-container">
                <h2>{reporsitory.name}</h2>
                <p className="Repo-Description">
                  {reporsitory.description
                    ? reporsitory.description.substring(0, 100)
                    : null}
                  ..
                </p>
                <div className="Description-row">
                  <Button as="div" labelPosition="right">
                    <Button color="yellow">
                      <Icon name="star" />
                      Stars
                    </Button>
                    <Label as="a" basic color="yellow" pointing="left">
                      {reporsitory.stargazers_count}
                    </Label>
                  </Button>
                  <Button as="div" labelPosition="right">
                    <Button basic color="red">
                      Issues
                    </Button>
                    <Label as="a" basic color="red" pointing="left">
                      {reporsitory.open_issues}
                    </Label>
                  </Button>

                  <p className="card-text">
                    <small className="text-muted">
                      Submitted 30 days ago by {reporsitory.owner.login}
                    </small>
                  </p>
                </div>
              </div>
          </div>
        ))}
    </section>
  );
};

export default CardElement;
