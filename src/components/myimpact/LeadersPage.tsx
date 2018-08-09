import * as React from 'react';
import { LayoutContainer } from '../layout';
import { UserState } from '../../redux/userState';

interface Props {
  readonly currentUser?: UserState;
}

const LeadersPage: React.StatelessComponent<Props> = (props: Props) => (
  <LayoutContainer>
    <section className="loading">
      <p>👩‍💻 <a href="">Log in</a> to share your results on the leaderboard</p>
    </section>
    <h1>Top Callers<span>last 30 days</span></h1>
    <div className="userList">
      <ul className="userList__left">
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>234 calls</p>
        </li>
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>234 calls</p>
        </li>
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>234 calls</p>
        </li>
      </ul>
      <ul className="userList__right">
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>234 calls</p>
        </li>
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>234 calls</p>
        </li>
      </ul>
    </div>
    <h1>Top Weekly Streaks</h1>
    <div className="userList">
      <ul className="userList__left">
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>20 weeks</p>
        </li>
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>20 weeks</p>
        </li>
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>20 weeks</p>
        </li>
      </ul>
      <ul className="userList__right">
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>20 weeks</p>
        </li>
        <li>
          <div className="userList__photo">
            <img src="https://pbs.twimg.com/profile_images/922523280845582336/oYBVGK5s_normal.jpg" alt="photo" />
            <span>🥇</span>
          </div>
          <h3>@nickoneill</h3>
          <p>20 weeks</p>
        </li>
      </ul>
    </div>
  </LayoutContainer>
);

export default LeadersPage;
